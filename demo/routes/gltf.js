var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('gltf', { title: 'peeks.demo.gltf' });
});

module.exports = router;
