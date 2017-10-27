var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var data = {
        pages: [],
    };

    data.pages.push({
        name: 'Zappos',
        url: 'https://www.zappos.com',
    });

    data.pages.push({
        name: 'Etsy',
        url: 'https://www.etsy.com/',
    });

    data.pages.push({
        name: 'UNIQLO',
        url: 'https://www.uniqlo.com/',
    });

    data.pages.push({
        name: 'HBO',
        url: 'https://www.hbo.com/',
    });

    data.pages.push({ name: 'fashion' });
    data.pages.push({ name: 'assets' });
    data.pages.push({ name: 'terraworlds' });

    res.send(JSON.stringify(data));
});

module.exports = router;
