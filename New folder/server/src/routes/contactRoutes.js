import express from 'express';
import {
  submitContactForm,
  getAllContacts,
  updateContactStatus,
  getContactById,
    deleteContact   
} from '../controllers/contactController.js';
import { validateContactForm } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/', validateContactForm, submitContactForm);

// Admin routes (add your authentication middleware)
// router.use(authMiddleware); // Uncomment when you add authentication
router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.patch('/:id/status', updateContactStatus);
router.delete('/:id', deleteContact);   

export default router;