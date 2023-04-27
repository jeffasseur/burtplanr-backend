const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/projects');

/* GET project page. */
router.get('/', projectController.index);

router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

router.post('/', projectController.addProject);

module.exports = router;
