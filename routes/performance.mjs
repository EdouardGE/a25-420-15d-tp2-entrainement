import { Router } from 'express';
import {
  obtenirToutesLesPerformances,
  creerPerformance,
  obtenirPerformanceParId,
  mettreAJourPerformance,
  supprimerPerformance
} from '../controllers/performanceController.mjs';

const router = Router();

// Routes pour les performances
router.get('/performances', obtenirToutesLesPerformances);
router.post('/performance', creerPerformance);
router.get('/performance/:performanceId', obtenirPerformanceParId);
router.put('/performance/:performanceId', mettreAJourPerformance);
router.delete('/performance/:performanceId', supprimerPerformance);

export default router;