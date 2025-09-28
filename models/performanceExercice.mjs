import { Schema, model } from 'mongoose';

const performanceExerciceSchema = new Schema(
  {
    seanceId: {
      type: Schema.Types.ObjectId,
      ref: 'Seance',
      required: [true, "Le champ `seanceId` est requis!"],
    },

    // ... à compléter

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

  // ... à compléter
  
});


// S'assurer que les champs virtuels sont inclus lors de la sérialisation JSON
performanceExerciceSchema.set('toJSON', { virtuals: true });
performanceExerciceSchema.set('toObject', { virtuals: true });

export default model('PerformanceExercice', performanceExerciceSchema);