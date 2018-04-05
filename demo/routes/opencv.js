var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('opencv', { title: 'peeks.demo.opencv' });
});

module.exports = router;
