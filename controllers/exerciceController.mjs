import Exercice from '../models/exercice.mjs';


/**
 * Obtenir tous les exercices
 */
export const obtenirTousLesExercices = async (req, res, next) => {
  try {
    const exercices = await Exercice.find().sort({ nom: 1 });
    res.status(200).json(exercices);
  } catch (error) {
    next(error);
  }
};

/**
 * Créer un nouvel exercice
 */
export const creerExercice = async (req, res, next) => {
  try {
    const nouvelExercice = new Exercice(req.body);
    const exerciceSauvegarde = await nouvelExercice.save();

    res.status(201)
      .location(`/exercice/${exerciceSauvegarde._id}`)
      .json(exerciceSauvegarde);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtenir un exercice par ID
 */
export const obtenirExerciceParId = async (req, res, next) => {
  try {
    const exercice = await Exercice.findById(req.params.exerciceId);

    if (!exercice) {
      return res.status(404).json({
        message: "Exercice introuvable avec l'ID fourni"
      });
    }

    res.status(200).json(exercice);
  } catch (error) {
    next(error);
  }
};

/**
 * Mettre à jour un exercice
 */
export const mettreAJourExercice = async (req, res, next) => {
  // ... à compléter
  try {
    const { exerciceId } = req.params;

    const exercice = await Exercice.findById(exerciceId);
    if (!exercice) {
      return res.status(404).json({ message: "Exercice non trouvé." });
    }

    const champs = ["nom", "type", "groupeMusculaire", "difficulte", "description", "equipement"];
    champs.forEach(champ => {
      if (req.body[champ] !== undefined) {
        exercice[champ] = req.body[champ];
      }
    });

    const exerciceMisAJour = await exercice.save();
    res.status(200).location(`/exercice/${exerciceMisAJour._id}`).json(exerciceMisAJour);
  } catch (error) {
    next(error);
  }
};

/**
 * Supprimer un exercice
 */
export const supprimerExercice = async (req, res, next) => {
  try {
    const exerciceSupp = await Exercice.findByIdAndDelete(req.params.exerciceId);

    if (!exerciceSupp) {
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
 * Rechercher des exercices par type trié par nom
 */
export const rechercherExercicesParType = async (req, res, next) => {
  try {
    const exercices = await Exercice.find(req.params);

    if (exercices.length === 0) {
      return res.status(404).json({
        message: "Aucun exercice trouvé",
      });
    }
    return res.status(200).json(exercices);
  } catch (error) {
    next(error);
  }

};

/**
 * Rechercher des exercices par groupe musculaire trié par nom
 */
export const rechercherExercicesParGroupeMusculaire = async (req, res, next) => {
  try {
    const { groupe } = req.params;

    const exercices = await Exercice.find({ groupeMusculaire: groupe });

    if (exercices.length === 0) {
      return res.status(404).json({
        message: `Aucun exercice trouvé pour le groupe musculaire '${groupe}'`,
      });
    }

    return res.status(200).json(exercices);
  } catch (error) {
    next(error);
  }
};