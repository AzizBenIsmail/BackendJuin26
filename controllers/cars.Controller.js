const CarModel = require('../models/car.models');
const UserModel = require('../models/user.Model');

// CREATE - Créer une nouvelle voiture
module.exports.createCar = async (req, res) => {
  try {
    const {
      marque,
      modele,
      annee,
      couleur,
      immatriculation,
      prix,
      description,
      kilometrage,
      typeCarburant,
      statut,
      nombrePlaces,
      typeTransmission,
      caracteristiques,
    } = req.body;

    // Validation des champs obligatoires
    if (!marque || !modele || !annee || !prix || !immatriculation) {
      return res.status(400).json({
        error: 'marque, modele, annee, prix, et immatriculation sont requis',
      });
    }

    const newCar = new CarModel({
      marque,
      modele,
      annee,
      couleur,
      immatriculation,
      prix,
      description,
      kilometrage,
      typeCarburant,
      statut,
      nombrePlaces,
      typeTransmission,
      caracteristiques,
    });

    const savedCar = await newCar.save();
    res.status(201).json({ message: 'Voiture créée avec succès', data: savedCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Récupérer toutes les voitures
module.exports.getAllCars = async (req, res) => {
  try {
    const { statut, marque, modele, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    // Construire le filtre
    let filter = {};
    if (statut) filter.statut = statut;
    if (marque) filter.marque = new RegExp(marque, 'i'); // Recherche insensible à la casse
    if (modele) filter.modele = new RegExp(modele, 'i');
    if (minPrice || maxPrice) {
      filter.prix = {};
      if (minPrice) filter.prix.$gte = parseFloat(minPrice);
      if (maxPrice) filter.prix.$lte = parseFloat(maxPrice);
    }

    const skip = (page - 1) * limit;

    const cars = await CarModel.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await CarModel.countDocuments(filter);

    res.status(200).json({
      data: cars,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Récupérer une voiture par ID
module.exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await CarModel.findById(id);

    if (!car) {
      return res.status(404).json({ error: 'Voiture non trouvée' });
    }

    res.status(200).json({ data: car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Mettre à jour une voiture
module.exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCar = await CarModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ error: 'Voiture non trouvée' });
    }

    res.status(200).json({
      message: 'Voiture mise à jour avec succès',
      data: updatedCar,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Supprimer une voiture
module.exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await CarModel.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ error: 'Voiture non trouvée' });
    }

    res.status(200).json({ message: 'Voiture supprimée avec succès', data: deletedCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Recherche avancée des voitures
module.exports.searchCars = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Paramètre de recherche requis' });
    }

    const cars = await CarModel.find({
      $or: [
        { marque: new RegExp(query, 'i') },
        { modele: new RegExp(query, 'i') },
        { couleur: new RegExp(query, 'i') },
        { description: new RegExp(query, 'i') },
      ],
    });

    res.status(200).json({ data: cars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les voitures disponibles
module.exports.getAvailableCars = async (req, res) => {
  try {
    const cars = await CarModel.find({ statut: 'disponible' });
    res.status(200).json({ data: cars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// BUY - Acheter une voiture (l'assigner à un utilisateur)
module.exports.buyCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Validation
    if (!userId) {
      return res.status(400).json({
        error: 'userId est requis pour acheter une voiture',
      });
    }

    // Vérifier que la voiture existe et est disponible
    const car = await CarModel.findById(id);

    if (!car) {
      return res.status(404).json({ error: 'Voiture non trouvée' });
    }

    if (car.statut !== 'disponible') {
      return res.status(400).json({
        error: `Cette voiture n'est pas disponible. Statut actuel: ${car.statut}`,
      });
    }

    // Vérifier que l'utilisateur existe
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Mettre à jour la voiture: assigner le propriétaire et changer le statut
    const updatedCar = await CarModel.findByIdAndUpdate(
      id,
      {
        proprietaire: userId,
        statut: 'réservée',
      },
      { new: true }
    ).populate('proprietaire');

    // Ajouter la voiture à carsOwned de l'utilisateur
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { carsOwned: id }
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Voiture achetée avec succès',
      data: updatedCar,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SELL - Vendre une voiture (retirer le propriétaire et marquer comme vendue)
module.exports.sellCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Vérifier que la voiture existe
    const car = await CarModel.findById(id);

    if (!car) {
      return res.status(404).json({ error: 'Voiture non trouvée' });
    }

    // Vérifier que la voiture appartient au propriétaire
    if (car.proprietaire?.toString() !== userId) {
      return res.status(403).json({
        error: 'Vous ne pouvez vendre que votre propre voiture',
      });
    }

    // Mettre à jour la voiture: retirer le propriétaire et changer le statut
    const updatedCar = await CarModel.findByIdAndUpdate(
      id,
      {
        proprietaire: null,
        statut: 'vendue',
      },
      { new: true }
    );

    // Retirer la voiture de carsOwned de l'utilisateur
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { carsOwned: id }
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Voiture vendue avec succès',
      data: updatedCar,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
