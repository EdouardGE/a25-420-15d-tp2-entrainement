import { Router } from 'express';
import {
  obtenirToutesLesSeances,
  creerSeance,
  obtenirSeanceParId,
  mettreAJourSeance,
  supprimerSeance,
  obtenirSeancesParAthlete,
  obtenirStatistiquesAthlete
} from '../controllers/seanceController.mjs';

const router = Router();

// Routes pour les séances
router.get('/seances', obtenirToutesLesSeances);
router.post('/seance', creerSeance);
router.get('/seance/:seanceId', obtenirSeanceParId);
router.put('/seance/:seanceId', mettreAJourSeance);
router.delete('/seance/:seanceId', supprimerSeance);

// Routes spécialisées
router.get('/athlete/:athleteId/seances', obtenirSeancesParAthlete);
router.get('/athlete/:athleteId/statistiques', obtenirStatistiquesAthlete);

export default router;