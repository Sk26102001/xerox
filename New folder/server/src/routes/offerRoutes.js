// server/src/routes/offerRoutes.js
import express from 'express';
import { offerController } from '../controllers/offerController.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes - no auth required
router.get('/active', offerController.getActiveOffers);
router.post('/validate', offerController.validateOffer);

// Admin only routes - require both auth and adminAuth
router.get('/', auth, adminAuth, offerController.getAllOffers);
router.get('/:id', auth, adminAuth, offerController.getOfferById);
router.post('/', auth, adminAuth, offerController.createOffer);
router.put('/:id', auth, adminAuth, offerController.updateOffer);
router.delete('/:id', auth, adminAuth, offerController.deleteOffer);

export default router;