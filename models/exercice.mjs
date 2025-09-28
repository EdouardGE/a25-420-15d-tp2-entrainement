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

    // ... à compléter
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Exercice', exerciceSchema);