import { Router } from 'express';
import Athlete from '../models/athlete.mjs';
import Exercice from '../models/exercice.mjs';
import Seance from '../models/seance.mjs';
import PerformanceExercice from '../models/performanceExercice.mjs';

const router = Router();

/**
 * Route pour initialiser la base de données avec des données de test
 */
router.get('/db/seed', async (req, res, next) => {
  try {
    // Nettoyer toutes les collections
    await Promise.all([
      PerformanceExercice.deleteMany({}),
      Seance.deleteMany({}),
      Exercice.deleteMany({}),
      Athlete.deleteMany({})
    ]);

    // Données de test pour les athlètes
    const athletes = await Athlete.insertMany([
      {
        nom: 'Dubois',
        prenom: 'Marie',
        email: 'marie.dubois@email.com',
        poids: 65,
        taille: 170,
        dateNaissance: new Date('1995-03-15')
      },
      {
        nom: 'Martin',
        prenom: 'Pierre',
        email: 'pierre.martin@email.com',
        poids: 80,
        taille: 185,
        dateNaissance: new Date('1990-07-22')
      },
      {
        nom: 'Tremblay',
        prenom: 'Sophie',
        email: 'sophie.tremblay@email.com',
        poids: 58,
        taille: 162,
        dateNaissance: new Date('1998-11-08')
      },
      {
        nom: 'Gagnon',
        prenom: 'Alex',
        email: 'alex.gagnon@email.com',
        poids: 75,
        taille: 178,
        dateNaissance: new Date('1992-05-30')
      }
    ]);

    // Données de test pour les exercices
    const exercices = await Exercice.insertMany([
      {
        nom: 'Développé couché',
        type: 'musculation',
        groupeMusculaire: 'pectoraux',
        difficulte: 3,
        description: 'Exercice de base pour les pectoraux, épaules et triceps',
        equipement: ['barre', 'banc', 'poids']
      },
      {
        nom: 'Squat',
        type: 'musculation',
        groupeMusculaire: 'quadriceps',
        difficulte: 4,
        description: 'Exercice roi pour les jambes et les fessiers',
        equipement: ['barre', 'rack', 'poids']
      },
      {
        nom: 'Tractions',
        type: 'musculation',
        groupeMusculaire: 'dos',
        difficulte: 4,
        description: 'Exercice au poids du corps pour le dos et les biceps',
        equipement: ['barre de traction']
      },
      {
        nom: 'Course à pied',
        type: 'cardio',
        groupeMusculaire: 'cardio',
        difficulte: 2,
        description: 'Exercice cardiovasculaire de base',
        equipement: []
      },
      {
        nom: 'Pompes',
        type: 'musculation',
        groupeMusculaire: 'pectoraux',
        difficulte: 2,
        description: 'Exercice au poids du corps pour pectoraux et triceps',
        equipement: []
      },
      {
        nom: 'Planche',
        type: 'musculation',
        groupeMusculaire: 'abdominaux',
        difficulte: 3,
        description: 'Exercice isométrique pour le core',
        equipement: []
      }
    ]);

    // Données de test pour les séances
    const seances = await Seance.insertMany([
      {
        athleteId: athletes[0]._id,
        dateSeance: new Date('2024-01-15'),
        dureeMinutes: 60,
        caloriesBrulees: 300,
        notes: 'Bonne séance de force'
      },
      {
        athleteId: athletes[0]._id,
        dateSeance: new Date('2024-01-17'),
        dureeMinutes: 45,
        caloriesBrulees: 250,
        notes: 'Séance cardio'
      },
      {
        athleteId: athletes[1]._id,
        dateSeance: new Date('2024-01-16'),
        dureeMinutes: 90,
        caloriesBrulees: 450,
        notes: 'Entraînement complet'
      },
      {
        athleteId: athletes[2]._id,
        dateSeance: new Date('2024-01-18'),
        dureeMinutes: 30,
        caloriesBrulees: 200,
        notes: 'Première séance'
      }
    ]);

    // Données de test pour les performances
    await PerformanceExercice.insertMany([
      // Séance de Marie (développé couché)
      {
        seanceId: seances[0]._id,
        exerciceId: exercices[0]._id, // Développé couché
        series: 3,
        repetitions: 10,
        poids: 40,
        tempsRepos: 120,
        notes: 'Bonne forme'
      },
      // Séance de Marie (squat)
      {
        seanceId: seances[0]._id,
        exerciceId: exercices[1]._id, // Squat
        series: 4,
        repetitions: 8,
        poids: 50,
        tempsRepos: 180,
        notes: 'Bon contrôle'
      },
      // Séance cardio de Marie
      {
        seanceId: seances[1]._id,
        exerciceId: exercices[3]._id, // Course à pied
        series: 1,
        repetitions: 1,
        poids: 0,
        tempsRepos: 0,
        notes: '45 minutes de course'
      },
      // Séance de Pierre
      {
        seanceId: seances[2]._id,
        exerciceId: exercices[0]._id, // Développé couché
        series: 4,
        repetitions: 8,
        poids: 70,
        tempsRepos: 150,
        notes: 'Progression normale'
      },
      {
        seanceId: seances[2]._id,
        exerciceId: exercices[2]._id, // Tractions
        series: 3,
        repetitions: 12,
        poids: 0,
        tempsRepos: 90,
        notes: 'Au poids du corps'
      },
      // Séance de Sophie
      {
        seanceId: seances[3]._id,
        exerciceId: exercices[4]._id, // Pompes
        series: 3,
        repetitions: 15,
        poids: 0,
        tempsRepos: 60,
        notes: 'Première fois'
      },
      {
        seanceId: seances[3]._id,
        exerciceId: exercices[5]._id, // Planche
        series: 3,
        repetitions: 1,
        poids: 0,
        tempsRepos: 30,
        notes: '30 secondes par série'
      }
    ]);

    const stats = {
      athletes: athletes.length,
      exercices: exercices.length,
      seances: seances.length,
      performances: 7,
      message: 'Base de données initialisée avec succès!'
    };

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * Route pour obtenir les statistiques de la base de données
 */
router.get('/db/stats', async (req, res, next) => {
  try {
    const [
      nbAthletes,
      nbExercices,
      nbSeances,
      nbPerformances
    ] = await Promise.all([
      Athlete.countDocuments(),
      Exercice.countDocuments(),
      Seance.countDocuments(),
      PerformanceExercice.countDocuments()
    ]);

    const stats = {
      athletes: nbAthletes,
      exercices: nbExercices,
      seances: nbSeances,
      performances: nbPerformances
    };

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
});

export default router;