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
    prenom: {
      type: String,
      null: [
        false,
        "Le champ `prenom` ne doit pas être nul! Ce champ doit faire de 1 à 50 caractères.",
      ],
      required: [
        true,
        "Le champ `prenom` est requis! Ce champ doit faire de 1 à 50 caractères.",
      ],
      minLength: [1, "Le champ `prenom` doit faire de 1 à 50 caractères!"],
      maxLength: [50, "Le champ `prenom` doit faire de 1 à 50 caractères!"],
      trim: true,
    },
    email: {
      type: String,
      null: [
        false,
        "Le champ `email` ne doit pas être nul!",
      ],
      unique: true,
      required: [
        true,
        "Le champ `email` est requis! ",
      ],
      match: [regexCourriel, "Please enter a valid email address."],
      trim: true,
    },
    poids: {
      type: Number,
      required: [true, "Le champ `poids` est requis!"],
      min: [20, "Le poids doit être au moins 20 kg."],
      max: [300, "Le poids doit être au plus 300 kg."]
    },

    taille: {
      type: Number,
      required: [
        true,
        "Le champ `taille` est requis! ",
      ],
      min: [100, "La taille doit dépasser 100 cm !"],
      max: [250, "La taille doit être en dessus de 250 cm !"]
    },

    dateNaissance: {
      type: Date,
      required: [
        true,
        "Le champ `dateNaissance` est requis!",
      ],
      validate: {
        validator: function (value) {
          if (!this.age)
            return false;
          return this.age >= 12 && this.age <= 120;
        },
        message: function (props) {
          return `Âge invalide (${this.age} ans) : il doit être compris entre 12 et 120 ans.`;
        },
      },
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Méthode virtuelle pour calculer l'âge
 */
athleteSchema.virtual('age').get(function () {
  if (!this.dateNaissance) {
    return null;
  }
  let naissance = new Date(this.dateNaissance);
  let aujourdHui = new Date();

  let age = aujourdHui.getFullYear() - naissance.getFullYear();
  let mois = aujourdHui.getMonth() - naissance.getMonth();

  if (mois < 0 || (mois === 0 && aujourdHui.getDate() < naissance.getDate())) {
    age--;
  }
  return age;
});

/**
 * Méthode virtuelle pour calculer l'IMC (Indice de Masse Corporelle)
 */
athleteSchema.virtual('imc').get(function () {
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