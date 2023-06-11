const express = require('express');
const router = express.Router();
const burgerController = require('./../controllers/users');

/* GET users listing. */
router.get('/', burgerController.index);

// GET burger by id
router.get('/id', burgerController.getBurgerById);

// login route
router.post('/login', burgerController.login);

// register route
router.post('/register', burgerController.register);

module.exports = router;
