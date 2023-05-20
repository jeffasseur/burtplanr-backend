const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/projects');

/* GET project page. */
router.get('/', projectController.index);

// GET project by id
router.get('/:id', projectController.getProjectById);

// Add new project
router.post('/new', projectController.addProject);

// update project by id
router.put('/:id', projectController.updateProjectById);

// Archive project
router.delete('/:id', projectController.deleteProject);

module.exports = router;
