const express = require('express');
const router = express.Router();
const creatieController = require('./../controllers/creatie');

/* GET project page. */
router.get('/', creatieController.index);

// // GET project by id
// router.get('/:id', creatieController.getProjectById);

// // Add new project
// router.post('/new', creatieController.addProject);

// // update project by id
// router.put('/:id', creatieController.updateProjectById);

// // Archive project
// router.delete('/:id', creatieController.deleteProject);

module.exports = router;
