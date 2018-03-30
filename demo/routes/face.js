var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('face', { title: 'peeks.demo.face' });
});

module.exports = router;
