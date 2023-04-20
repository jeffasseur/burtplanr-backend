var express = require('express');
var router = express.Router();

/* GET project page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Projects' });
});

router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

module.exports = router;
