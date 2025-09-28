import { Schema, model } from 'mongoose';

/**
 * Expression rationnelle pour valider les adresses courriel (RFC 6531)
 */
const regexCourriel = new RegExp(
	// eslint-disable-next-line no-useless-escape
	/^(?<localPart>(?<dotString>[0-9a-z!#$%&'*+-\/=?^_`\{|\}~\u{80}-\u{10FFFF}]+(\.[0-9a-z!#$%&'*+-\/=?^_`\{|\}~\u{80}-\u{10FFFF}]+)*)|(?<quotedString>"([\x20-\x21\x23-\x5B\x5D-\x7E\u{80}-\u{10FFFF}]|\\[\x20-\x7E])*"))(?<!.{64,})@(?<domainOrAddressLiteral>(?<addressLiteral>\[((?<IPv4>\d{1,3}(\.\d{1,3}){3})|(?<IPv6Full>IPv6:[0-9a-f]{1,4}(:[0-9a-f]{1,4}){7})|(?<IPv6Comp>IPv6:([0-9a-f]{1,4}(:[0-9a-f]{1,4}){0,5})?::([0-9a-f]{1,4}(:[0-9a-f]{1,4}){0,5})?)|(?<IPv6v4Full>IPv6:[0-9a-f]{1,4}(:[0-9a-f]{1,4}){5}:\d{1,3}(\.\d{1,3}){3})|(?<IPv6v4Comp>IPv6:([0-9a-f]{1,4}(:[0-9a-f]{1,4}){0,3})?::([0-9a-f]{1,4}(:[0-9a-f]{1,4}){0,3}:)?\d{1,3}(\.\d{1,3}){3})|(?<generalAddressLiteral>[a-z0-9-]*[[a-z0-9]:[\x21-\x5A\x5E-\x7E]+))\])|(?<Domain>(?!.{256,})(([0-9a-z\u{80}-\u{10FFFF}]([0-9a-z-\u{80}-\u{10FFFF}]*[0-9a-z\u{80}-\u{10FFFF}])?))(\.([0-9a-z\u{80}-\u{10FFFF}]([0-9a-z-\u{80}-\u{10FFFF}]*[0-9a-z\u{80}-\u{10FFFF}])?))*))$/iu,
);

const athleteSchema = new Schema(
  {
    nom: {
      type: String,
      null: [
        false,
        "Le champ `nom` ne doit pas être nul! Ce champ doit faire de 1 à 50 caractères.",
      ],
      required: [
        true,
        "Le champ `nom` est requis! Ce champ doit faire de 1 à 50 caractères.",
      ],
      minLength: [1, "Le champ `nom` doit faire de 1 à 50 caractères!"],
      maxLength: [50, "Le champ `nom` doit faire de 1 à 50 caractères!"],
      trim: true,
    },

    // ... à compléter


  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Méthode virtuelle pour calculer l'âge
 */
athleteSchema.virtual('age').get(function() {
  if (!this.dateNaissance) {
    return null;
  }

  // ... à compléter

  return age;
});

/**
 * Méthode virtuelle pour calculer l'IMC (Indice de Masse Corporelle)
 */
athleteSchema.virtual('imc').get(function() {
  if (!this.poids || !this.taille) {
    return null;
  }

  const tailleEnMetres = this.taille / 100;
  return Math.round((this.poids / (tailleEnMetres * tailleEnMetres)) * 10) / 10;
});

// S'assurer que les champs virtuels sont inclus lors de la sérialisation JSON
athleteSchema.set('toJSON', { virtuals: true });
athleteSchema.set('toObject', { virtuals: true });

export default model('Athlete', athleteSchema);