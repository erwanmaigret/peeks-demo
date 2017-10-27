var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var data = { pages: [] };

    data.pages.push({ name: 'Zappos', url: 'https://www.zappos.com' });

    // css parsing issue:
    //data.pages.push({ name: 'Frys', url: 'https://www.frys.com/' });

    // css parsing issue:
    //data.pages.push({ name: 'Victoria Secret', url: 'https://www.victoriassecret.com/' });

    // CORS issues:
    data.pages.push({ name: 'Etsy', url: 'https://www.etsy.com/' });
    data.pages.push({ name: 'UNIQLO', url: 'https://www.uniqlo.com/' });
    // data.pages.push({name: 'HBO', url: 'https://www.hbo.com/' });
    data.pages.push({ name: '2D Assets' });
    data.pages.push({ name: '3D Assets' });
    data.pages.push({ name: 'Terra Worlds' });

    res.send(JSON.stringify(data));
});

module.exports = router;
