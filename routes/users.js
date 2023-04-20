const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.index);

// login route
router.post('/login', userController.login);

// register route
router.post('/register', userController.Register);

module.exports = router;
