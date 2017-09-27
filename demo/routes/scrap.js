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
                        var elems = dom.window.document.querySelectorAll("a");
                        scrapData.menu = [];
                        for (var elemI in elems) {
                            var elem = elems[elemI];
                            if (elem) {
                                if (elem.id &&
                                    elem.id.search('headerNavigationLink') === 0 &&
                                    elem.textContent)
                                {
                                    scrapData.menu.push({label: elem.textContent});
                                }
                            }
                        }
                        res.send(JSON.stringify(scrapData));
                    }
                }
            }
        );
    }
});

module.exports = router;
