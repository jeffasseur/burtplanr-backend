const express = require('express');
const router = express.Router();
const creatieController = require('../controllers/creatie');
//const { loginRequired } = require('./../middleware/auth');

/* GET creations */
router.get('/', creatieController.index);

// // GET creation by id
router.get('/:id', creatieController.getCreationById);

// GET all creations by burger id
router.get('/burger/:id', creatieController.getCreationsByBurgerId);

// // GET creatie by id and burger id
router.get('/:projectId/:burgerId', creatieController.getCreationByProjectIdAndBurgerId);

// // Add new creation to project
router.post('/new/:projectId/:burgerId', creatieController.addCreation);

// // update creation by id
router.put('/:id', creatieController.updateCreationById);

// // Delete creation
router.delete('/:id', creatieController.deleteCreation);

module.exports = router;
