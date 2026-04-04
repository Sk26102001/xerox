// // server/src/routes/promocodeRoutes.js
// import express from 'express';
// import { promoController } from '../controllers/promocodeController.js'; 
// import auth from '../middleware/auth.js';
// import adminAuth from '../middleware/adminAuth.js';

// const router = express.Router();

// // Public routes (validation) - no auth required
// router.post('/validate', promoController.validatePromoCode);
// router.post('/apply', promoController.applyPromoToOrder);

// // Admin only routes - require both auth and adminAuth
// router.get('/', auth, adminAuth, promoController.getAllPromoCodes);
// router.get('/:id', auth, adminAuth, promoController.getPromoCodeById);
// router.post('/', auth, adminAuth, promoController.createPromoCode);
// router.put('/:id', auth, adminAuth, promoController.updatePromoCode);
// router.delete('/:id', auth, adminAuth, promoController.deletePromoCode);

// export default router;





// server/src/routes/promocodeRoutes.js
import express from 'express';
import { promoController } from '../controllers/promocodeController.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes (validation) - no auth required
router.post('/validate', promoController.validatePromoCode);
router.post('/apply', promoController.applyPromoToOrder);
router.get('/active', promoController.getActivePromoCodes);  // ← ADD THIS - Public endpoint for active promos

// Admin only routes - require both auth and adminAuth
router.get('/', auth, adminAuth, promoController.getAllPromoCodes);
router.get('/:id', auth, adminAuth, promoController.getPromoCodeById);
router.post('/', auth, adminAuth, promoController.createPromoCode);
router.put('/:id', auth, adminAuth, promoController.updatePromoCode);
router.delete('/:id', auth, adminAuth, promoController.deletePromoCode);

export default router;