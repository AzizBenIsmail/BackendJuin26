const mongoose = require('mongoose');
const CarModel = require('../models/car.models');
require('dotenv').config();

// Données statiques de 15 voitures
const cars = [
  {
    marque: 'Peugeot',
    modele: '3008',
    annee: 2022,
    couleur: 'Noir',
    immatriculation: 'AB-123-CD',
    prix: 28000,
    description: 'SUV moderne et spacieux, excellent état',
    kilometrage: 15000,
    typeCarburant: 'diesel',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 130,
      consommation: '4.5L/100km',
      emissions: '118g/km',
    },
  },
  {
    marque: 'Renault',
    modele: 'Clio',
    annee: 2021,
    couleur: 'Blanc',
    immatriculation: 'EF-456-GH',
    prix: 15000,
    description: 'Citadine fiable et économique',
    kilometrage: 25000,
    typeCarburant: 'essence',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'manuelle',
    caracteristiques: {
      puissance: 100,
      consommation: '5.2L/100km',
      emissions: '122g/km',
    },
  },
  {
    marque: 'Citroën',
    modele: 'C5 Aircross',
    annee: 2023,
    couleur: 'Gris',
    immatriculation: 'IJ-789-KL',
    prix: 32000,
    description: 'SUV confortable avec technologie avancée',
    kilometrage: 8000,
    typeCarburant: 'diesel',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 160,
      consommation: '4.8L/100km',
      emissions: '126g/km',
    },
  },
  {
    marque: 'Toyota',
    modele: 'Corolla',
    annee: 2022,
    couleur: 'Argent',
    immatriculation: 'MN-012-OP',
    prix: 22000,
    description: 'Berline fiable et économique',
    kilometrage: 30000,
    typeCarburant: 'hybride',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 122,
      consommation: '3.8L/100km',
      emissions: '88g/km',
    },
  },
  {
    marque: 'BMW',
    modele: '320i',
    annee: 2020,
    couleur: 'Bleu',
    immatriculation: 'QR-345-ST',
    prix: 35000,
    description: 'Berline premium avec équipements haut de gamme',
    kilometrage: 45000,
    typeCarburant: 'essence',
    statut: 'en maintenance',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 184,
      consommation: '6.1L/100km',
      emissions: '141g/km',
    },
  },
  {
    marque: 'Volkswagen',
    modele: 'Golf',
    annee: 2021,
    couleur: 'Rouge',
    immatriculation: 'UV-678-WX',
    prix: 20000,
    description: 'Compacte sportive et dynamique',
    kilometrage: 35000,
    typeCarburant: 'essence',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'manuelle',
    caracteristiques: {
      puissance: 130,
      consommation: '5.5L/100km',
      emissions: '129g/km',
    },
  },
  {
    marque: 'Audi',
    modele: 'A4',
    annee: 2023,
    couleur: 'Noir',
    immatriculation: 'YZ-901-AB',
    prix: 42000,
    description: 'Berline luxe avec design élégant',
    kilometrage: 5000,
    typeCarburant: 'diesel',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 190,
      consommation: '4.6L/100km',
      emissions: '121g/km',
    },
  },
  {
    marque: 'Ford',
    modele: 'Fiesta',
    annee: 2020,
    couleur: 'Orange',
    immatriculation: 'CD-234-EF',
    prix: 12000,
    description: 'Citadine ludique et pratique',
    kilometrage: 55000,
    typeCarburant: 'essence',
    statut: 'réservée',
    nombrePlaces: 5,
    typeTransmission: 'manuelle',
    caracteristiques: {
      puissance: 95,
      consommation: '5.0L/100km',
      emissions: '117g/km',
    },
  },
  {
    marque: 'Fiat',
    modele: '500',
    annee: 2022,
    couleur: 'Jaune',
    immatriculation: 'GH-567-IJ',
    prix: 18000,
    description: 'Petite voiture rétro et charmante',
    kilometrage: 20000,
    typeCarburant: 'essence',
    statut: 'disponible',
    nombrePlaces: 4,
    typeTransmission: 'manuelle',
    caracteristiques: {
      puissance: 110,
      consommation: '5.3L/100km',
      emissions: '124g/km',
    },
  },
  {
    marque: 'Volvo',
    modele: 'XC60',
    annee: 2023,
    couleur: 'Blanc',
    immatriculation: 'KL-890-MN',
    prix: 48000,
    description: 'SUV premium avec sécurité maximale',
    kilometrage: 3000,
    typeCarburant: 'hybride',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 250,
      consommation: '5.9L/100km',
      emissions: '138g/km',
    },
  },
  {
    marque: 'Skoda',
    modele: 'Superb',
    annee: 2021,
    couleur: 'Vert',
    immatriculation: 'OP-123-QR',
    prix: 25000,
    description: 'Berline spacieuse et économique',
    kilometrage: 40000,
    typeCarburant: 'diesel',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 150,
      consommation: '4.7L/100km',
      emissions: '124g/km',
    },
  },
  {
    marque: 'Mazda',
    modele: 'CX-5',
    annee: 2022,
    couleur: 'Marron',
    immatriculation: 'ST-456-UV',
    prix: 30000,
    description: 'SUV japonais fiable et élégant',
    kilometrage: 18000,
    typeCarburant: 'essence',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 165,
      consommation: '5.8L/100km',
      emissions: '135g/km',
    },
  },
  {
    marque: 'Hyundai',
    modele: 'Tucson',
    annee: 2021,
    couleur: 'Bleu',
    immatriculation: 'WX-789-YZ',
    prix: 24000,
    description: 'SUV compact avec bon rapport qualité-prix',
    kilometrage: 32000,
    typeCarburant: 'diesel',
    statut: 'vendue',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 136,
      consommation: '5.1L/100km',
      emissions: '134g/km',
    },
  },
  {
    marque: 'Kia',
    modele: 'Niro',
    annee: 2022,
    couleur: 'Noir',
    immatriculation: 'AB-012-CD',
    prix: 26000,
    description: 'Crossover écologique et pratique',
    kilometrage: 22000,
    typeCarburant: 'hybride',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 141,
      consommation: '4.3L/100km',
      emissions: '101g/km',
    },
  },
  {
    marque: 'Tesla',
    modele: 'Model 3',
    annee: 2023,
    couleur: 'Blanc',
    immatriculation: 'EF-345-GH',
    prix: 55000,
    description: 'Berline électrique haute performance',
    kilometrage: 10000,
    typeCarburant: 'électrique',
    statut: 'disponible',
    nombrePlaces: 5,
    typeTransmission: 'automatique',
    caracteristiques: {
      puissance: 366,
      consommation: '0L/100km',
      emissions: '0g/km',
    },
  },
];

// Fonction pour seeder les voitures
async function seedCars() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.mongoURI);

    console.log('✓ Connecté à MongoDB');

    // Supprimer toutes les voitures existantes
    await CarModel.deleteMany({});
    console.log('✓ Anciens documents supprimés');

    // Insérer les données
    const result = await CarModel.insertMany(cars);
    console.log(`✓ ${result.length} voitures ajoutées avec succès`);

    // Déconnecter de MongoDB
    await mongoose.disconnect();
    console.log('✓ Déconnecté de MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('✗ Erreur lors du seeding:', error.message);
    process.exit(1);
  }
}

// Exécuter le seeder
seedCars();
