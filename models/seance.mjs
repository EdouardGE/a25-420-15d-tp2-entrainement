import { Schema, model, mongoose } from 'mongoose';

const seanceSchema = new Schema(
  {
    athleteId: {
      type: Schema.Types.ObjectId,
      ref: 'Athlete',
      required: [true, "Le champ `athleteId` est requis!"],
    },
    dateSeance: {
      type: Date,
      required: [true, "Le champ `dateSeance` est requis!"],
      validate: {
        validator: function(value) {
          return value <= new Date();
        },
        message: "La date de séance ne peut pas être dans le futur!",
      },
    },
    dureeMinutes: {
      type: Number,
      required: [true, "Le champ `dureeMinutes` est requis!"],
      min: [5, "La durée doit être d'au moins 5 minutes!"],
      max: [480, "La durée ne peut pas dépasser 8 heures (480 minutes)!"],
    },
    caloriesBrulees: {
      type: Number,
      min: [0, "Les calories brûlées ne peuvent pas être négatives!"]
    },
    notes: {
      type: String,
      maxLength: [500, "Les notes ne peuvent pas dépasser 500 caractères!"],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Méthode pour calculer automatiquement les calories brûlées
 * basée sur le poids de l'athlète et la durée
 */
seanceSchema.methods.calculerCalories = async function() {
  try {
    const Athlete = mongoose.model('Athlete');
    const athlete = await Athlete.findById(this.athleteId);
    console.log('Athlete trouvé pour le calcul des calories:', athlete);

    // ... à compléter


  } catch (error) {
    console.error('Erreur lors du calcul des calories:', error);
  }
};

export default model('Seance', seanceSchema);