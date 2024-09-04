import { Router } from 'express';
import {
  getAllRooms,
  getRoomById,
  pushRoom,
  upRoom,
  delRoom,
} from '../controllers/roomsController';

const router = Router();

// GET http://localhost/api/rooms/ (Récupérer tout les chambres)
router.get('/', getAllRooms);

// GET http://localhost/api/rooms/:roomId (Récupérer la chambre avec l'id :roomId)
router.get('/:roomId', getRoomById);

// POST http://localhost/api/rooms/ (Créer une chambre)
router.post('/', pushRoom);

// PUT http://localhost/api/rooms/:roomId (Mettre à jour la chambre avec l'id :roomId)
router.put('/:roomId', upRoom);

// DELETE http://localhost/api/rooms/:roomId (Supprimer la chambre avec l'id :roomId)
router.delete('/:roomId', delRoom);

export default router;
