var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.Controller');
const upload = require('../middlewares/upload.file');

// CREATE - Créer un nouvel utilisateur
router.post('/',upload.single('profileImage'), usersController.createUser);

// READ - Récupérer tous les utilisateurs
router.get('/', usersController.getAllUsers);

// READ - Récupérer un utilisateur par ID
router.get('/:id', usersController.getUserById);

// UPDATE - Mettre à jour un utilisateur
router.put('/:id', upload.single('profileImage'), usersController.updateUser);

// DELETE - Supprimer un utilisateur
router.delete('/:id', usersController.deleteUser);

module.exports = router;
