import { Router } from 'express';
import { login, logout, register } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/logout', authMiddleware, logout);


export default router;
