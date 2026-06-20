const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    marque: {
      type: String,
      required: [true, "La marque de la voiture est requise"],
      trim: true,
    },
    modele: {
      type: String,
      required: [true, "Le modèle de la voiture est requis"],
      trim: true,
    },
    annee: {
      type: Number,
      required: [true, "L'année de la voiture est requise"],
      min: [1900, "L'année doit être supérieure à 1900"],
      max: [new Date().getFullYear() + 1, "L'année ne peut pas être dans le futur"],
    },
    couleur: {
      type: String,
      trim: true,
      default: "Non spécifiée",
    },
    immatriculation: {
      type: String,
      trim: true,
      uppercase: true,
      unique: [true, "Cette immatriculation existe déjà"],
    },
    prix: {
      type: Number,
      required: [true, "Le prix est requis"],
      min: [0, "Le prix ne peut pas être négatif"],
    },
    description: {
      type: String,
      trim: true,
    },
    kilometrage: {
      type: Number,
      default: 0,
      min: [0, "Le kilométrage ne peut pas être négatif"],
    },
    typeCarburant: {
      type: String,
      enum: ["essence", "diesel", "électrique", "hybride", "gaz"],
      default: "essence",
    },
    statut: {
      type: String,
      enum: ["disponible", "vendue", "en maintenance", "réservée"],
      default: "disponible",
    },
    nombrePlaces: {
      type: Number,
      default: 5,
      min: [1, "Une voiture doit avoir au moins une place"],
      max: [9, "Une voiture ne peut pas avoir plus de 9 places"],
    },
    typeTransmission: {
      type: String,
      enum: ["manuelle", "automatique"],
      default: "manuelle",
    },
    caracteristiques: {
      puissance: {
        type: Number,
        default: null,
      },
      consommation: {
        type: String,
        default: null,
      },
      emissions: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index pour les recherches fréquentes
carSchema.index({ marque: 1, modele: 1 });
carSchema.index({ statut: 1 });
carSchema.index({ prix: 1 });

module.exports = mongoose.model("Car", carSchema);
