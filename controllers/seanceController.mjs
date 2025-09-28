import Seance from '../models/seance.mjs';
import Athlete from '../models/athlete.mjs';
import PerformanceExercice from '../models/performanceExercice.mjs';

/**
 * Obtenir toutes les séances
 */
export const obtenirToutesLesSeances = async (req, res, next) => {
  try {
    const seances = await Seance.find()
      .populate('athleteId')
      .sort({ dateSeance: -1 });
    res.status(200).json(seances);
  } catch (error) {
    next(error);
  }
};

/**
 * Créer une nouvelle séance
 */
export const creerSeance = async (req, res, next) => {
    // ... à compléter
};

/**
 * Obtenir une séance par ID avec ses performances
 */
export const obtenirSeanceParId = async (req, res, next) => {
    // ... à compléter
};

/**
 * Mettre à jour une séance
 */
export const mettreAJourSeance = async (req, res, next) => {
    // ... à compléter
};

/**
 * Supprimer une séance
 */
export const supprimerSeance = async (req, res, next) => {
  // ... à compléter
};

/**
 * Obtenir les séances d'un athlète
 */
export const obtenirSeancesParAthlete = async (req, res, next) => {
  // ... à compléter
};

/**
 * Obtenir les statistiques d'un athlète
 */
export const obtenirStatistiquesAthlete = async (req, res, next) => {
  // ... à compléter
};