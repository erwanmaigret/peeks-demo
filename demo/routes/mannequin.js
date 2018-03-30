var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'peeks.demo.mannequin' });
});

module.exports = router;
