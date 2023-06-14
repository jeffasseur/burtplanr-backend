const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/projects');
const { loginRequired } = require('./../middleware/auth/burger');

/* GET all projects */
router.get('/', projectController.index);

// GET project by id
router.get('/:id', projectController.getProjectById);

// Add new project
router.post('/new', /*adminRequired,*/ projectController.addProject);

// update project by id
router.put('/:id', /*adminRequired,*/ projectController.updateProjectById);

// Archive project
router.delete('/:id', /*adminRequired,*/ projectController.deleteProject);

module.exports = router;
