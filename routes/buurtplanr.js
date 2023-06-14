const express = require('express');
const router = express.Router();
const buurtplanrController = require('../controllers/buurtplanr');

// GET buurtplanr settings
router.get('/', buurtplanrController.getBuurtplanr);

router.put('/update', buurtplanrController.updateBuurtplanr);

module.exports = router;