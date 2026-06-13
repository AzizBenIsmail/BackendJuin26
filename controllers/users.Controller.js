const UserModel = require('../models/user.Model');
const { notifyUserCreation } = require('../utils/discord.notification');
const { sendWelcomeEmail, sendAdminNotificationEmail } = require('../utils/email.service');

// CREATE - Créer un nouvel utilisateur
module.exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, age, phone, address, city, country } = req.body;

    // Validation des champs obligatoires
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    // Récupérer le chemin de l'image si elle existe
    let profileImage = null;
    if (req.file) {
      profileImage = `/images/${req.file.filename}`;
    }

    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password,
      age,
      phone,
      address,
      city,
      country,
      profileImage,
    });

    const savedUser = await newUser.save();
    
    // Envoyer une notification Discord
    await notifyUserCreation(savedUser);
    
    // Envoyer un email de bienvenue à l'utilisateur
    await sendWelcomeEmail(savedUser.email, savedUser.firstname);
    
    // Envoyer une notification par email à l'administrateur
    await sendAdminNotificationEmail(savedUser);
    
    res.status(201).json({ message: 'User created successfully', data: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Récupérer tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select('-password');
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Récupérer un utilisateur par ID
module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Mettre à jour un utilisateur
module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Si une nouvelle image est uploadée, ajouter son chemin
    if (req.file) {
      updateData.profileImage = `/images/${req.file.filename}`;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};