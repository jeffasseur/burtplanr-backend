const express = require('express');
const router = express.Router();
const creatieController = require('../controllers/creatie');
//// const { loginRequired } = require('./../middleware/auth/burger');
// const { adminrequired } = require('./../middleware/auth/admin');

/* GET creations */
router.get('/', creatieController.index);

// // GET creation by id
router.get('/:id', creatieController.getCreationById);

// // GET all creations by project id ONLY ADMIN
router.get('/:projectId', creatieController.getCreationsByProjectId);

// // GET all creations by project id for voting
router.get('/voting/:projectId', creatieController.getCreationsByProjectId);

// GET winning creation by project id
router.get('/voting/winner/:projectId', creatieController.getWinningCreationByProjectId);

// GET all creations by burger id
router.get('/burger/:id', creatieController.getCreationsByBurgerId);

// // GET creatie by id and burger id
router.get('/:projectId/:burgerId', creatieController.getCreationByProjectIdAndBurgerId);

// // Add new creation to project
router.post('/new/:projectId/:burgerId', creatieController.addCreation);

// Add vote to creation
router.post('/vote/:creatieId', creatieController.addVote);

// // update creation by id
router.put('/:id', creatieController.updateCreationById);

// // Delete creation
router.delete('/:id', creatieController.deleteCreation);

module.exports = router;
