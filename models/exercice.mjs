import { Schema, model } from 'mongoose';

const exerciceSchema = new Schema(
  {
    nom: {
      type: String,
      required: [true, "Le champ `nom` est requis!"],
      maxLength: [100, "Le champ `nom` doit faire de 1 à 100 caractères!"],
      trim: true,
      unique: true,
    },
     type: {
      type: String,
      required: [true,
         "Le champ `type` est requis!",
        ],
      enum: {
        values: ['cardio', 'musculation', 'flexibilite', 'equilibre', 'fonctionnel'],
        message:
          "Le type doit être parmi: 'cardio', 'musculation', 'flexibilite', 'equilibre', 'fonctionnel'.",
      },
    },

    groupeMusculaire: {
      type: String,
      required: [
        true,
         "Le champ `groupeMusculaire` est requis!",
        ],
      enum: {
        values: [
          'pectoraux',
          'dos',
          'epaules',
          'biceps',
          'triceps',
          'avant-bras',
          'abdominaux',
          'quadriceps',
          'ischio-jambiers',
          'fessiers',
          'mollets',
          'corps-entier',
          'cardio',
        ],
        message:
          "Le groupe musculaire doit être parmi les valeurs autorisées (pectoraux, dos, etc.).",
      },
    },

    difficulte: {
      type: Number,
      required: [true, "Le champ `difficulte` est requis!"],
      min: [1, "La difficulté minimale est 1."],
      max: [5, "La difficulté maximale est 5."],
    },

    description: {
      type: String,
      maxlength: [500, "La description ne doit pas dépasser 500 caractères!"],
      default: "",
      trim: true,
    },

    equipement: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Exercice', exerciceSchema);