import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', ProductController.getAllProducts as any);
router.get('/:id', ProductController.getProductById as any);

// Protected routes (require authentication)
router.post('/', auth as any, ProductController.createProduct as any);
router.put('/:id', auth as any, ProductController.updateProduct as any);
router.delete('/:id', auth as any, ProductController.deleteProduct as any);

export default router;