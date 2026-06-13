const { GoogleGenerativeAI } = require('@google/generative-ai');

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
    const result = await model.generateContent(prompt.trim());
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
