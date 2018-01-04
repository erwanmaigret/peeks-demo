var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('greetings', { title: 'greetings' });
});

module.exports = router;
