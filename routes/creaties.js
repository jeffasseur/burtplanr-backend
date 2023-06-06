const express = require('express');
const router = express.Router();
const creatieController = require('../controllers/creatie');
const { loginRequired, adminRequired } = require('./../middleware/auth');

/* GET project page. */
router.get('/', adminRequired, creatieController.index);

// // GET project by id
router.get('/:id', adminRequired, creatieController.getCreationById);

// // Add new creation to project
router.post('/new/:projectId/:burgerId', loginRequired, creatieController.addCreation);

// // update project by id
router.put('/:id', loginRequired, creatieController.updateCreationById);

// // Archive project
// router.delete('/:id', creatieController.deleteProject);

module.exports = router;
