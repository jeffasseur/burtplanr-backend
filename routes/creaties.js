const express = require('express');
const router = express.Router();
const creatieController = require('../controllers/creatie');

/* GET project page. */
router.get('/', creatieController.index);

// // GET project by id
router.get('/:id', creatieController.getCreationById);

// // GET creatie by id and burger id
router.get('/:id/:burgerId', creatieController.getCreationByIdAndBurgerId);

// // Add new creation to project
router.post('/new/:projectId/:burgerId', creatieController.addCreation);

// // update project by id
router.put('/:id', creatieController.updateCreationById);

// // Archive project
// router.delete('/:id', creatieController.deleteProject);

module.exports = router;
