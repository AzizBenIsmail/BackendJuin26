const { GoogleGenerativeAI } = require('@google/generative-ai');
const CarModel = require('../models/car.models');
const { extractionPrompt, recommendationPrompt, generateContentPrompt } = require('../utils/gemini.prompts');

// Initialiser le client Gemini avec la clé API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /gemini/generate - Générer du contenu avec Gemini
module.exports.generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validation du prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Le champ "prompt" est requis et doit être une chaîne de caractères non vide.'
      });
    }

    // Vérifier que la clé API est configurée
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'La clé API Gemini n\'est pas configurée (GEMINI_API_KEY manquante).'
      });
    }

    // Obtenir le modèle Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Générer le contenu
    const result = await model.generateContent(generateContentPrompt(prompt));
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      response: text
    });

  } catch (error) {
    console.error('Erreur Gemini API:', error);

    // Gérer les erreurs spécifiques
    if (error.message.includes('API_KEY_INVALID') || error.message.includes('401')) {
      return res.status(401).json({
        success: false,
        error: 'Clé API Gemini invalide ou expirée.'
      });
    }

    if (error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('429')) {
      return res.status(429).json({
        success: false,
        error: 'Limite de requêtes atteinte. Veuillez réessayer plus tard.'
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de la génération de contenu avec Gemini.'
    });
  }
};

// GET /gemini/health - Vérifier la disponibilité de l'API Gemini
module.exports.healthCheck = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        status: 'API Gemini non configurée'
      });
    }

    // Vérifier que le client peut se connecter
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    res.status(200).json({
      success: true,
      status: 'API Gemini disponible',
      model: 'gemini-2.0-flash'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'Erreur de connexion à Gemini API',
      error: error.message
    });
  }
};

// POST /gemini/recommend-cars - Recommander des voitures selon les préférences (texte simple)
module.exports.recommendCars = async (req, res) => {
  try {
    const { userInput } = req.body;

    // Validation du paramètre
    if (!userInput || typeof userInput !== 'string' || userInput.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Le champ "userInput" est requis et doit être un texte non vide'
      });
    }

    // Étape 1: Analyser le texte avec Gemini pour extraire les préférences
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const extractionResult = await model.generateContent(extractionPrompt(userInput));
    const extractedText = await extractionResult.response.text();
    
    // Parser la réponse JSON
    let preferences;
    try {
      preferences = JSON.parse(extractedText);
    } catch (e) {
      // Si le parsing échoue, essayer d'extraire le JSON du texte
      const jsonMatch = extractedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        preferences = JSON.parse(jsonMatch[0]);
      } else {
        return res.status(400).json({
          success: false,
          error: 'Impossible de comprendre vos préférences. Veuillez être plus spécifique.'
        });
      }
    }

    // Étape 2: Construire le filtre pour les voitures disponibles
    let filter = { statut: 'disponible' };
    
    if (preferences.budget) {
      filter.prix = { $lte: preferences.budget };
    }
    if (preferences.marque) {
      filter.marque = new RegExp(preferences.marque, 'i');
    }
    if (preferences.typeCarburant) {
      filter.typeCarburant = preferences.typeCarburant;
    }
    if (preferences.typeTransmission) {
      filter.typeTransmission = preferences.typeTransmission;
    }
    if (preferences.anneeMin || preferences.anneeMax) {
      filter.annee = {};
      if (preferences.anneeMin) filter.annee.$gte = preferences.anneeMin;
      if (preferences.anneeMax) filter.annee.$lte = preferences.anneeMax;
    }
    
    // Ajouter un filtre pour le nombre de places si demandé
    if (preferences.nombrePlacesMin) {
      filter.nombrePlaces = { $gte: preferences.nombrePlacesMin };
    }

    // Étape 3: Récupérer les voitures correspondantes
    const availableCars = await CarModel.find(filter).limit(20);

    if (availableCars.length === 0) {
      const suggestions = [];
      
      // Générer des suggestions basées sur les préférences
      if (preferences.typeVehicule) {
        suggestions.push(`Aucun ${preferences.typeVehicule} disponible`);
      }
      if (preferences.nombrePlacesMin) {
        suggestions.push(`avec au minimum ${preferences.nombrePlacesMin} places`);
      }
      if (preferences.budget) {
        suggestions.push(`dans votre budget de ${preferences.budget}€`);
      }

      return res.status(404).json({
        success: false,
        error: 'Aucune voiture disponible correspondant exactement à vos critères',
        extractedPreferences: preferences,
        suggestion: suggestions.length > 0 
          ? `Nous n'avons pas de véhicule correspondant à: ${suggestions.join(', ')}`
          : 'Essayez d\'ajuster vos critères',
        availableCars: []
      });
    }

    // Préparer les données pour Gemini
    const carsData = availableCars.map(car => ({
      id: car._id,
      marque: car.marque,
      modele: car.modele,
      annee: car.annee,
      prix: car.prix,
      couleur: car.couleur,
      kilometrage: car.kilometrage,
      typeCarburant: car.typeCarburant,
      typeTransmission: car.typeTransmission,
      description: car.description,
      nombrePlaces: car.nombrePlaces,
      caracteristiques: car.caracteristiques
    }));

    // Étape 4: Demander à Gemini de recommander les meilleures voitures avec expertise
    const result = await model.generateContent(recommendationPrompt(userInput, preferences, carsData));
    const response = await result.response;
    const recommendation = response.text();

    res.status(200).json({
      success: true,
      userInput: userInput,
      extractedPreferences: preferences,
      availableCarsCount: availableCars.length,
      availableCars: carsData,
      recommendation: recommendation
    });

  } catch (error) {
    console.error('Erreur recommandation voitures:', error);

    res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de la recommandation de voitures'
    });
  }
};