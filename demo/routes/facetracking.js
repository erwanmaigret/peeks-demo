var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('facetracking', { title: 'peeks.demo.facetracking' });
});

module.exports = router;
