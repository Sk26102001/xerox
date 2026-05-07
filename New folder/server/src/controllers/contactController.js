// import Contact from '../models/contact.js';
// import { sendAdminNotification, sendAutoReply } from '../utils/emailService.js';

// // Subject label mapping
// const subjectLabels = {
//   quote: 'Quote Request / Pricing',
//   order: 'Order Placement / Tracking',
//   bulk: 'Bulk Order / Book Publishing',
//   file: 'File Upload / Technical Help',
//   other: 'General Query'
// };

// // @desc    Submit contact form
// // @route   POST /api/contact
// // @access  Public
// export const submitContactForm = async (req, res) => {
//   try {
//     const { name, phone, email, subject, message, agreeToTerms } = req.body;
    
//     // Get IP and user agent
//     const ipAddress = req.ip || req.connection.remoteAddress;
//     const userAgent = req.headers['user-agent'];
    
//     // Create contact document
//     const contact = new Contact({
//       name,
//       phone,
//       email: email || null,
//       subject,
//       subjectLabel: subjectLabels[subject],
//       message,
//       agreeToTerms,
//       ipAddress,
//       userAgent
//     });
    
//     await contact.save();
    
//     // Send email notifications (don't await to avoid blocking response)
//     Promise.all([
//       sendAdminNotification(contact),
//       sendAutoReply(contact)
//     ]).catch(err => console.error('Email error:', err));
    
//     res.status(201).json({
//       success: true,
//       message: 'Message sent successfully! We will get back to you soon.',
//       data: {
//         id: contact._id,
//         name: contact.name,
//         subject: contact.subjectLabel
//       }
//     });
    
//   } catch (error) {
//     console.error('Contact submission error:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: 'Server error. Please try again later or contact us via WhatsApp.'
//     });
//   }
// };

// // @desc    Get all contact submissions (Admin only)
// // @route   GET /api/contact
// // @access  Private (Add your own auth middleware)
// export const getAllContacts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;
//     const skip = (page - 1) * limit;
//     const status = req.query.status;
    
//     const query = status ? { status } : {};
    
//     const [contacts, total] = await Promise.all([
//       Contact.find(query)
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit),
//       Contact.countDocuments(query)
//     ]);
    
//     res.json({
//       success: true,
//       data: contacts,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching contacts:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // @desc    Update contact status (Admin only)
// // @route   PATCH /api/contact/:id/status
// // @access  Private
// export const updateContactStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
    
//     if (!['pending', 'replied', 'spam'].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid status'
//       });
//     }
    
//     const contact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true, runValidators: true }
//     );
    
//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: 'Status updated successfully',
//       data: contact
//     });
//   } catch (error) {
//     console.error('Error updating status:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // @desc    Get single contact by ID (Admin only)
// // @route   GET /api/contact/:id
// // @access  Private
// export const getContactById = async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
    
//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       data: contact
//     });
//   } catch (error) {
//     console.error('Error fetching contact:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// // @desc    Delete contact message
// // @route   DELETE /api/contact/:id
// // @access  Public (or Admin – add auth later)
// export const deleteContact = async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(req.params.id);
    
//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: 'Contact deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting contact:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };


import Contact from '../models/contact.js';
import { sendAdminNotification, sendAutoReply } from '../utils/emailService.js';

// Subject label mapping
const subjectLabels = {
  quote: 'Quote Request / Pricing',
  order: 'Order Placement / Tracking',
  bulk: 'Bulk Order / Book Publishing',
  file: 'File Upload / Technical Help',
  other: 'General Query',
  book_publishing: 'Book Publishing Inquiry' // added for book publishing
};

// @desc    Submit contact form (supports general & book publishing)
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    let { name, phone, email, subject, message, agreeToTerms, inquiryType } = req.body;
    
    // Default inquiry type
    inquiryType = inquiryType || 'general';
    
    // For book publishing, provide default values for required fields
    if (inquiryType === 'book_publishing') {
      subject = subject || 'book_publishing';
      message = message || 'Book publishing inquiry';
      agreeToTerms = agreeToTerms !== undefined ? agreeToTerms : true;
    }
    
    // Get IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    // Determine subjectLabel
    let subjectLabel;
    if (inquiryType === 'book_publishing') {
      subjectLabel = subjectLabels.book_publishing;
    } else {
      subjectLabel = subjectLabels[subject] || 'General Query';
    }
    
    // Create contact document
    const contact = new Contact({
      name,
      phone,
      email: email || null,
      subject,
      subjectLabel,
      message,
      agreeToTerms,
      inquiryType,
      ipAddress,
      userAgent
    });
    
    await contact.save();
    
    // Send email notifications (don't await to avoid blocking response)
    Promise.all([
      sendAdminNotification(contact),
      sendAutoReply(contact)
    ]).catch(err => console.error('Email error:', err));
    
    res.status(201).json({
      success: true,
      message: inquiryType === 'book_publishing' 
        ? 'Your book publishing inquiry has been submitted! We will contact you soon.'
        : 'Message sent successfully! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        subject: contact.subjectLabel
      }
    });
    
  } catch (error) {
    console.error('Contact submission error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later or contact us via WhatsApp.'
    });
  }
};

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
// @access  Private (Add your own auth middleware)
export const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const inquiryType = req.query.inquiryType;
    
    const query = {};
    if (status) query.status = status;
    if (inquiryType && inquiryType !== 'all') query.inquiryType = inquiryType;
    
    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Contact.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update contact status (Admin only)
// @route   PATCH /api/contact/:id/status
// @access  Private
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'replied', 'spam'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single contact by ID (Admin only)
// @route   GET /api/contact/:id
// @access  Private
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Public (or Admin – add auth later)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};