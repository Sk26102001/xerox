import express from 'express';
import { testimonialController } from '../controllers/testimonialController.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes (no auth required)
router.get('/active', testimonialController.getActiveTestimonials);
router.get('/stats', testimonialController.getTestimonialStats);
router.post('/public', testimonialController.createPublicTestimonial);

// Admin only routes
router.get('/', auth, adminAuth, testimonialController.getAllTestimonials);
router.get('/:id', auth, adminAuth, testimonialController.getTestimonialById);
router.post('/', auth, adminAuth, testimonialController.createTestimonial);
router.put('/:id', auth, adminAuth, testimonialController.updateTestimonial);
router.delete('/:id', auth, adminAuth, testimonialController.deleteTestimonial);
router.patch('/:id/toggle', auth, adminAuth, testimonialController.toggleActive);

export default router;