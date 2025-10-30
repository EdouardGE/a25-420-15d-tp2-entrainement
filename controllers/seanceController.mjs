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
  try {

    const { athleteId } = req.params;

    const athlete = await Athlete.findById(athleteId);

    if (!athlete) {
      return res.status(404).json({
        message: "Athlète introuvable avec l'ID fourni"
      });
    }

    const seances = await Seance.find({ athleteId }).populate('athleteId', 'nom prenom age imc').sort({ dateSeance: -1 });

    res.status(200).json(seances);
  } catch (error) {
    next(error);
  }
};


/**
 * Obtenir les statistiques d'un athlète
 */
export const obtenirStatistiquesAthlete = async (req, res, next) => {
  try{
    const { athleteId } = req.params;

    const athlete = await Athlete.findById(athleteId).select('nom prenom age imc');

    if (!athlete) {
      return res.status(404).json({ message: "Athlète introuvable avec l'ID fourni." });
    }

    const seances = await Seance.find({ athleteId }).select('dureeMinutes caloriesBrulees dateSeance');

    if (seances.length === 0) {
      return res.status(200).json({
        athlete,
        totalSeances: 0,
        totalHeuresEntrainement: 0,
        totalCaloriesBrulees: 0,
        moyenneDureeSeance: 0,
        moyenneCaloriesParSeance: 0,
        premiereSeance: null,
        derniereSeance: null
      });
    }

    const totalSeances = seances.length;

    const totalMinutesEntrainement = seances.reduce(
      (totalMinutes, seance) => totalMinutes + seance.dureeMinutes, 0
    );

    const totalHeuresEntrainement = parseFloat(
      (totalMinutesEntrainement / 60).toFixed(1)
    );

    const totalCaloriesBrulees = Math.round(
      seances.reduce((total, seance) => total + seance.caloriesBrulees, 0)
    );

    const moyenneDureeSeance = Math.round(
      totalMinutesEntrainement / totalSeances
    );

    const moyenneCaloriesParSeance = Math.round(
      totalCaloriesBrulees / totalSeances
    );

    const premiereSeanceFormatSimple = seances.reduce((plusAncienne, courante) => {
      const dateCourante = new Date(courante.dateSeance);
      const datePlusAncienne = new Date(plusAncienne.dateSeance);

      if (dateCourante < datePlusAncienne) {
        return courante;
      } else {
        return plusAncienne;
      }
    }, seances[0]);

    const premiereSeance = new Date(premiereSeanceFormatSimple.dateSeance).toISOString();

    const derniereSeanceFormatSimple = seances.reduce((plusAncienne, courante) => {
      const dateCourante = new Date(courante.dateSeance);
      const datePlusAncienne = new Date(plusAncienne.dateSeance);

      if (dateCourante > datePlusAncienne) {
        return courante;
      } else {
        return plusAncienne;
      }
    }, seances[0]);

    const derniereSeance = new Date(derniereSeanceFormatSimple.dateSeance).toISOString();

    res.status(200).json({
      athlete,
      totalSeances,
      totalHeuresEntrainement,
      totalCaloriesBrulees,
      moyenneDureeSeance,
      moyenneCaloriesParSeance,
      premiereSeance,
      derniereSeance
    });
  } catch (error) {
    next(error);
  }
};