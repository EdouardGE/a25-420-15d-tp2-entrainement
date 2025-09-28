import { Router } from 'express';
import {
  obtenirTousLesExercices,
  creerExercice,
  obtenirExerciceParId,
  mettreAJourExercice,
  supprimerExercice,
  rechercherExercicesParType,
  rechercherExercicesParGroupeMusculaire
} from '../controllers/exerciceController.mjs';


const router = Router();

// Routes pour les exercices
router.get('/exercices', obtenirTousLesExercices);
router.post('/exercice', creerExercice);
router.get('/exercice/:exerciceId', obtenirExerciceParId);
router.put('/exercice/:exerciceId', mettreAJourExercice);
router.delete('/exercice/:exerciceId', supprimerExercice);

// Routes de recherche
router.get('/exercices/type/:type', rechercherExercicesParType);
router.get('/exercices/groupe/:groupe', rechercherExercicesParGroupeMusculaire);

export default router;