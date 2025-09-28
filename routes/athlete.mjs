import { Router } from 'express';
import {
  obtenirTousLesAthletes,
  creerAthlete,
  obtenirAthleteParId,
  mettreAJourAthlete,
  supprimerAthlete
} from '../controllers/athleteController.mjs';


const router = Router();

// Routes pour les athlètes
router.get('/athletes', obtenirTousLesAthletes);
router.post('/athlete', creerAthlete);
router.get('/athlete/:athleteId', obtenirAthleteParId);
router.put('/athlete/:athleteId', mettreAJourAthlete);
router.delete('/athlete/:athleteId', supprimerAthlete);

export default router;