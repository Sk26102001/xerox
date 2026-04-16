import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9+\-\s()]+$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  subject: {
    type: String,
    enum: ['quote', 'order', 'bulk', 'file', 'other'],
    required: [true, 'Subject is required']
  },
  subjectLabel: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [5000, 'Message cannot exceed 5000 characters']
  },
  agreeToTerms: {
    type: Boolean,
    required: [true, 'You must agree to the terms'],
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'replied', 'spam'],
    default: 'pending'
  },
  inquiryType: {
  type: String,
  enum: ['general', 'book_publishing'],
  default: 'general'
},
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Index for faster queries
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ phone: 1 });
contactSchema.index({ email: 1 });

export default mongoose.model('Contact', contactSchema);