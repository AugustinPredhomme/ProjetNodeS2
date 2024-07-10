import { Router } from 'express';
import { getAllDebugEntries, pushDebugEntry } from '../controllers/debugController';

const router = Router();

// GET http://localhost/api/debug/ (Récupérer tout les messages de debug)
router.get('/', getAllDebugEntries);

// POST http://localhost/api/debug/ (Créer un message de debug)
router.post('/', pushDebugEntry);

export default router;
