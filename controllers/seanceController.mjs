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
  try {
    const { athleteId, dateSeance, dureeMinutes, notes } = req.body;

    const nouvelleSeance = new Seance({ athleteId, dateSeance, dureeMinutes, notes });
    await nouvelleSeance.calculerCalories();

    const seanceSauvegardee = await nouvelleSeance.save();

    res
      .status(201)
      .location(`/seances/${seanceSauvegardee._id}`)
      .json(seanceSauvegardee);
  } catch (error) {
    next(error);
  }
};


/**
 * Obtenir une séance par ID avec ses performances
 */
export const obtenirSeanceParId = async (req, res, next) => {
  try {
    const { seanceId } = req.params;

    const seance = await Seance.findById(seanceId).populate('athleteId');

    if (!seance) {
      return res.status(404).json({
        message: "Séance introuvable avec l'ID fourni"
      });
    }

    const performances = await PerformanceExercice.find({ seanceId }).populate("exerciceId", "nom type groupeMusculaire");

    res.status(200).json({ seance, performances });
  } catch (error) {
    next(error);
  }
};

/**
 * Mettre à jour une séance
 */
export const mettreAJourSeance = async (req, res, next) => {
  try{
    const {seanceId} = req.params;

    const seance = await Seance.findById(seanceId);
    if (!seance) {
      return res.status(404).json({message: "Séance non trouvée."});
    }

    const champs = ["athleteId", "dateSeance", "dureeMinutes", "notes"];
    champs.forEach(champ => {
      if(req.body[champ] !== undefined){
        seance[champ] = req.body[champ];
      }
    });

    const seanceMisAJour = await seance.save();
    res.status(200).location(`/seances/${seanceMisAJour._id}`).json(seanceMisAJour);
  } catch (error) {
    next(error);
  }
};

/**
 * Supprimer une séance
 */
export const supprimerSeance = async (req, res, next) => {
  try {
    const SeeanceSupp = await Seance.findByIdAndDelete(req.params.SeanceId);
    if (!SeeanceSupp) {
      return res.status(404).json({
        message: "Exercice introuvable avec l'ID fourni"
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
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