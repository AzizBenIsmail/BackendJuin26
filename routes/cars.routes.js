var express = require('express');
var router = express.Router();
const carsController = require('../controllers/cars.Controller');
const upload = require('../middlewares/upload.file');

// CREATE - Créer une nouvelle voiture
router.post('/', carsController.createCar);

// READ - Récupérer toutes les voitures (avec filtres et pagination)
router.get('/', carsController.getAllCars);

// READ - Récupérer les voitures disponibles
router.get('/available', carsController.getAvailableCars);

// READ - Recherche avancée
router.get('/search', carsController.searchCars);

// READ - Récupérer une voiture par ID
router.get('/:id', carsController.getCarById);

// UPDATE - Mettre à jour une voiture
router.put('/:id', carsController.updateCar);

// DELETE - Supprimer une voiture
router.delete('/:id', carsController.deleteCar);

module.exports = router;
