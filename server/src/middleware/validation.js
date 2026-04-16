// import { body, validationResult } from 'express-validator';

// export const validateContactForm = [
//   body('name')
//     .trim()
//     .notEmpty().withMessage('Name is required')
//     .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  
//   body('phone')
//     .trim()
//     .notEmpty().withMessage('Phone number is required')
//     .matches(/^[0-9+\-\s()]{10,15}$/).withMessage('Enter a valid phone number'),
  
//   body('email')
//     .optional({ checkFalsy: true })
//     .isEmail().withMessage('Enter a valid email address')
//     .normalizeEmail(),
  
//   body('subject')
//     .notEmpty().withMessage('Subject is required')
//     .isIn(['quote', 'order', 'bulk', 'file', 'other']).withMessage('Invalid subject'),
  
//   body('message')
//     .trim()
//     .notEmpty().withMessage('Message is required')
//     .isLength({ min: 10, max: 5000 }).withMessage('Message must be 10-5000 characters'),
  
//   body('agreeToTerms')
//     .isBoolean().withMessage('Invalid terms agreement')
//     .custom(value => value === true).withMessage('You must agree to the terms and conditions'),
  
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ 
//         success: false, 
//         errors: errors.array() 
//       });
//     }
//     next();
//   }
// ];




import { body, validationResult } from 'express-validator';

export const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9+\-\s()]{10,15}$/).withMessage('Enter a valid phone number'),
  
  body('email')
    .optional({ checkFalsy: true })
    .isEmail().withMessage('Enter a valid email address')
    .normalizeEmail(),
  
  // Conditional: only validate subject if inquiryType is not 'book_publishing'
  body('subject')
    .if(body('inquiryType').not().equals('book_publishing'))
    .notEmpty().withMessage('Subject is required')
    .isIn(['quote', 'order', 'bulk', 'file', 'other']).withMessage('Invalid subject'),
  
  // Conditional: only validate message if inquiryType is not 'book_publishing'
  body('message')
    .if(body('inquiryType').not().equals('book_publishing'))
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be 10-5000 characters'),
  
  // Conditional: only validate agreeToTerms if inquiryType is not 'book_publishing'
  body('agreeToTerms')
    .if(body('inquiryType').not().equals('book_publishing'))
    .isBoolean().withMessage('Invalid terms agreement')
    .custom(value => value === true).withMessage('You must agree to the terms and conditions'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    next();
  }
];