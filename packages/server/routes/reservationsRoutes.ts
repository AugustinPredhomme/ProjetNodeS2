import { Router } from 'express';
import {
  getAllReservations,
  getReservationById,
  pushReservation,
  upReservation,
  delReservation,
} from '../controllers/reservationsController';

const router = Router();

// GET http://localhost/api/reservations/ (Récupérer tout les réservations)
router.get('/', getAllReservations);

// GET http://localhost/api/reservations/:reservationId (Récupérer la réservation avec l'id :reservationId)
router.get('/:reservationId', getReservationById);

// POST http://localhost/api/reservations/ (Créer une réservation)
router.post('/', pushReservation);

// PUT http://localhost/api/reservations/:reservationId (Mettre à jour la réservation avec l'id :reservationId)
router.put('/:reservationId', upReservation);

// DELETE http://localhost/api/reservations/:reservationId (Supprimer la réservation avec l'id :reservationId)
router.delete('/:reservationId', delReservation);

export default router;
