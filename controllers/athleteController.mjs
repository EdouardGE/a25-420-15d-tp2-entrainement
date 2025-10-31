import Athlete from '../models/athlete.mjs';

/**
 * Obtenir tous les athlètes
 */
export const obtenirTousLesAthletes = async (req, res, next) => {
  try {
    const exercices = await Athlete.find().sort({ nom: 1 });
    res.status(200).json(exercices);
  } catch (error) {
    next(error);
  }
};

/**
 * Créer un nouvel athlète
 */
export const creerAthlete = async (req, res, next) => {
  try {
    const nouvelAthlete = new Athlete(req.body);
    const AthleteSauvegarde = await nouvelAthlete.save();
    res.status(201)
      .location(`/athlete/${AthleteSauvegarde._id}`)
      .json(AthleteSauvegarde);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtenir un athlète par ID
 */
export const obtenirAthleteParId = async (req, res, next) => {
  try {
    const athlete = await Athlete.findById(req.params.athleteId);
    if (!athlete) {
      return res.status(404).json({
        message: "Athlète introuvable avec l'ID fourni"
      });

    }
    res.status(200).json(athlete);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(422).json({
        message: "ID invalide !"
      });
    }
    if (error.name === "ValidationError") {
      return res.status(422).json({
        message: "Un des champs n'est pas bien formatés"
      });
    }
    next(error);
  }
};

/**
 * Mettre à jour un athlète
 */
export const mettreAJourAthlete = async (req, res, next) => {
  try {
    const { athleteId } = req.params;

    if (!athleteId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(422).json({ message: "ID d'athlète invalide." });
    }

    const athlete = await Athlete.findById(athleteId);
    if (!athlete) {
      return res.status(404).json({ message: "Athlète non trouvé." });
    }

    const champs = ["nom", "prenom", "email", "dateNaissance", "poids", "taille"];
    champs.forEach(champ => {
      if (req.body[champ] !== undefined) {
        athlete[champ] = req.body[champ];
      }
    });

    const athleteMisAJour = await athlete.save();
    res.status(200).location(`/athlete/${athleteMisAJour._id}`).json(athleteMisAJour);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json({ message: error.message });
    }
    next(error);
  }
};


/**
 * Supprimer un athlète
 */
export const supprimerAthlete = async (req, res, next) => {
  try {
    const athleteSupp = await Athlete.findByIdAndDelete(req.params.athleteId);

    if (!athleteSupp) {
      return res.status(404).json({
        message: "Athlète introuvable avec l'ID fourni",
      });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }

};