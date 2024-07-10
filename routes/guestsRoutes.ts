import { Router } from 'express';
import {
  getAllGuests,
  getGuestById,
  pushGuest,
  upGuest,
  delGuest,
} from '../controllers/guestsController';

const router = Router();

// GET http://localhost/api/guests/ (Récupérer tout les invités)
router.get('/', getAllGuests);

// GET http://localhost/api/guests/:guestId (Récupérer l'invité avec l'id :guestId)
router.get('/:guestId', getGuestById);

// POST http://localhost/api/guests/ (Créer un invité)
router.post('/', pushGuest);

// PUT http://localhost/api/guests/:guestId (Mettre à jour l'invité avec l'id :guestId)
router.put('/:guestId', upGuest);

// DELETE http://localhost/api/guests/:guestId (Supprimer l'invité avec l'id :guestId)
router.delete('/:guestId', delGuest);

export default router;
