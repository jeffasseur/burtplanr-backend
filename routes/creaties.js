const express = require('express');
const router = express.Router();
const creatieController = require('../controllers/creatie');
const { loginRequired, adminRequired } = require('./../middleware/auth');

/* GET creations */
router.get('/', adminRequired, creatieController.index);

// // GET creation by id
router.get('/:id', adminRequired, creatieController.getCreationById);

// GET all creations by burger id
// router.get('/:burgerId', loginRequired, creatieController.getCreationsByBurgerId);

// // GET creatie by id and burger id
// router.get('/:id/:burgerId', loginRequired, creatieController.getCreationByIdAndBurgerId);

// // GET creatie by id and burger id
router.get('/:projectId/:burgerId', creatieController.getCreationByProjectIdAndBurgerId);

// // Add new creation to project
router.post('/new/:projectId/:burgerId', loginRequired, creatieController.addCreation);

// // update project by id
router.put('/:id', loginRequired, creatieController.updateCreationById);

// // Archive project
// router.delete('/:id', creatieController.deleteProject);

module.exports = router;
