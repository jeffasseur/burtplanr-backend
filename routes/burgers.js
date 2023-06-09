const express = require('express');
const router = express.Router();
const burgerController = require('./../controllers/users');
const { loginRequired } = require('./../middleware/auth');

/* GET users listing. */
router.get('/', burgerController.index);

// GET burger by id
router.get('/id', loginRequired, burgerController.getBurgerById);

// login route
router.post('/login', burgerController.login);

// register route
router.post('/register', burgerController.register);

// logout route
router.get('/logout', loginRequired, burgerController.logout);

module.exports = router;
