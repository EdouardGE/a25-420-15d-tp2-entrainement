import { Schema, model } from 'mongoose';

const performanceExerciceSchema = new Schema(
  {
    seanceId: {
      type: Schema.Types.ObjectId,
      ref: 'Seance',
      required: [true, "Le champ `seanceId` est requis!"],
    },
    exerciceId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercice',
      required: [true, "Le champ `exerciceId` est requis!"],
    },
    series: {
      type: Number,
      required: [true, "Le champ `series` est requis!"],
      min: [1, "Le nombre de séries doit être au moins 1."],
      max: [20, "Le nombre de séries ne peut pas dépasser 20."],
    },

    repetitions: {
      type: Number,
      required: [true, "Le champ `repetitions` est requis!"],
      min: [1, "Le nombre de répétitions doit être au moins 1."],
      max: [1000, "Le nombre de répétitions ne peut pas dépasser 1000."],
    },

    poids: {
      type: Number,
      min: [0, "Le poids doit pas être négatif."],
      max: [1000, "Le poids ne peut pas dépasser 1000 kg."],
    },

    tempsRepos: {
      type: Number,
      required: [true, "Le champ `tempsRepos` est requis!"],
      min: [0, "Le temps de repos doit être au moins 0 secondes."],
      max: [600, "Le temps de repos ne peut pas dépasser 600 secondes."],
    },

    notes: {
      type: String,
      maxlength: [200, "Les notes ne peuvent pas dépasser 200 caractères."],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Méthode virtuelle pour calculer le volume d'entraînement
 * Volume = séries × répétitions × poids
 */
performanceExerciceSchema.virtual('volumeEntrainement').get(function() {
  if (!this.series || !this.repetitions || !this.poids) {
    return null;
  }
  if (this.poids === 0) {
    return 0;
  }
  return this.series * this.repetitions * this.poids;
});


// S'assurer que les champs virtuels sont inclus lors de la sérialisation JSON
performanceExerciceSchema.set('toJSON', { virtuals: true });
performanceExerciceSchema.set('toObject', { virtuals: true });

export default model('PerformanceExercice', performanceExerciceSchema);