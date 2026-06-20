var express = require('express');
var router = express.Router();
const geminiController = require('../controllers/gemini.Controller');

// POST - Générer du contenu avec Gemini
router.post('/generate', geminiController.generateContent);

// GET - Vérifier la santé de l'API Gemini
router.get('/health', geminiController.healthCheck);

// POST - Recommander des voitures selon les préférences
router.post('/recommend-cars', geminiController.recommendCars);

module.exports = router;
