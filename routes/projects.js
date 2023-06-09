const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/projects');
const { loginRequired, adminRequired } = require('./../middleware/auth');

/* GET all projects */
router.get('/', loginRequired, projectController.index);

// GET project by id
router.get('/:id', loginRequired, projectController.getProjectById);

// Add new project
router.post('/new', projectController.addProject);

// update project by id
router.put('/:id', adminRequired, projectController.updateProjectById);

// Archive project
router.delete('/:id', adminRequired, projectController.deleteProject);

module.exports = router;
