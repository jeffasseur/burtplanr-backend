const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/projects');

/* GET project page. */
router.get('/', projectController.index);

router.get('/:id', projectController.getProjectById);

router.post('/', projectController.addProject);

module.exports = router;
