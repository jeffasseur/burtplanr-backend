const express = require('express');
const router = express.Router();
const gemeenteController = require('./../controllers/gemeentes');
// const { adminRequired } = require('../middleware/auth');

router.post('/login', gemeenteController.login);

router.post('/register', gemeenteController.register);

router.get('/logout', gemeenteController.logout);

module.exports = router;