import PerformanceExercice from '../models/performanceExercice.mjs';
import Seance from '../models/seance.mjs';
import Exercice from '../models/exercice.mjs';

/**
 * Obtenir toutes les performances
 */
export const obtenirToutesLesPerformances = async (req, res, next) => {
  try {
      const perfo = await PerformanceExercice.find()
        .populate('seanceId')
        .sort({ createdAt: -1 });
      res.status(200).json(perfo);
    } catch (error) {
      next(error);
    }
};

/**
 * Créer une nouvelle performance
 */
export const creerPerformance = async (req, res, next) => {
  // ... à compléter
  try {
    const nouvellePerformance = new PerformanceExercice(req.body);
    const performanceSauvegarde = await nouvellePerformance.save();
    res.status(201)
      .location(`/performance/${performanceSauvegarde._id}`)
      .json(performanceSauvegarde);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtenir une performance par ID
 */
export const obtenirPerformanceParId = async (req, res, next) => {
  // ... à compléter
};

/**
 * Mettre à jour une performance
 */
export const mettreAJourPerformance = async (req, res, next) => {
  // ... à compléter
  try {
    const { performanceId } = req.params;

    const performance = await PerformanceExercice.findById(performanceId);
    if (!performance) {
      return res.status(404).json({ message: "Performance non trouvée." });
    }

    const champs = ["seanceId", "exerciceId", "series", "repetitions", "poids", "tempsRepos", "notes"];
    champs.forEach(champ => {
      if (req.body[champ] !== undefined) {
        performance[champ] = req.body[champ];
      }
    });

    const performanceMisAJour = await performance.save();
    res.status(200).location(`/performance/${performanceMisAJour._id}`).json(performanceMisAJour);
  } catch (error) {
    next(error);
  }
};

/**
 * Supprimer une performance
 */
export const supprimerPerformance = async (req, res, next) => {
  try {
    const perfoSupp = await PerformanceExercice.findByIdAndDelete(req.params.performanceId);

    if (!perfoSupp) {
      return res.status(404).json({
        message: "PerformanceExercice introuvable avec l'ID fourni",
      });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

