var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('fortinet', { title: 'Fortinet' });
});

module.exports = router;
