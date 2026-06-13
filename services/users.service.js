const User = require('../models/user.Model');

// CREATE - Créer un nouvel utilisateur
module.exports.createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

// READ - Récupérer tous les utilisateurs
module.exports. getAllUsers = async () => {
  try {
    const users = await User.find().select('-password');
    return users;
  } catch (error) {
    throw error;
  }
};

// READ - Récupérer un utilisateur par ID
module.exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    return user;
  } catch (error) {
    throw error;
  }
};

// UPDATE - Mettre à jour un utilisateur
module.exports.updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// DELETE - Supprimer un utilisateur
module.exports.deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    throw error;
  }
};
