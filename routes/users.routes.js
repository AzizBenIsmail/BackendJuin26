var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.Controller');
const upload = require('../middlewares/upload.file');
const {requireAuthUser} = require('../middlewares/authMiddlewares');

// CREATE - Créer un nouvel utilisateur
router.post('/',upload.single('profileImage'), usersController.createUser);

// READ - Récupérer tous les utilisateurs
//router.get('/', usersController.getAllUsers);

router.get('/',requireAuthUser, usersController.getAllUsers);

// READ - Récupérer un utilisateur par ID
router.get('/:id', usersController.getUserById);

// UPDATE - Mettre à jour un utilisateur
router.put('/:id', upload.single('profileImage'), usersController.updateUser);

// DELETE - Supprimer un utilisateur
router.delete('/:id', usersController.deleteUser);

// LOGIN - Authentifier un utilisateur
router.post('/login', usersController.loginUser);

// LOGOUT - Déconnecter un utilisateur
router.post('/logout', usersController.logoutUser);

module.exports = router;
