var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('frye', { title: 'frye' });
});

module.exports = router;
