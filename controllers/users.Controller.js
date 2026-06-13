const usersService = require('../services/users.service');

// CREATE - Créer un nouvel utilisateur
module.exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, age, phone, address, city, country } = req.body;

    // Validation des champs obligatoires
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const newUser = await usersService.createUser({
      firstname,
      lastname,
      email,
      password,
      age,
      phone,
      address,
      city,
      country,
    });

    res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Récupérer tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Récupérer un utilisateur par ID
module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);

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

    const updatedUser = await usersService.updateUser(id, updateData);

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
    const deletedUser = await usersService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};