var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

router.get('/', function(req, res, next) {
    var uri = req.query['uri'];
    if (uri) {
        console.log('Scapping ' + uri);
        request(
            {
                uri: uri,
                //maxRedirects: '100',
                jar: true, // Allow cookies to avoid infinite redirects
                // followRedirect: false,
            },
            function (error, response, html) {
                if (!error) {
                    if (response.statusCode == 200) {
                        var dom = new JSDOM(html);
                        var scrapData = {};
                        scrapData.title = dom.window.document.title;
                        res.send(JSON.stringify(scrapData));
                    }
                }
            }
        );
    }
});

module.exports = router;
