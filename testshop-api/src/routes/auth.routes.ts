import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { auth } from '../middleware/auth.middleware';

console.log('AUTH ROUTES LOADED');

const router = Router();

router.post('/register', (req, res, next) => {
  console.log('REGISTER ROUTE HIT');
  console.log('Request body:', req.body);
  AuthController.register(req, res, next);
});

router.post('/login', (req, res, next) => {
  console.log('LOGIN ROUTE HIT');  
  AuthController.login(req, res, next);
});

router.get('/profile', auth as any, AuthController.getProfile as any);

export default router;