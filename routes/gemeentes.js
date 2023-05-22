const express = require('express');
const router = express.Router();
const gemeenteController = require('./../controllers/gemeentes');

router.post('/login', gemeenteController.login);

router.post('/register', gemeenteController.register);

module.exports = router;