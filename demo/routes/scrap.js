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
                        var data = {};

                        // Peeks predictive data
                        data.peeks = {};
                        data.peeks.title = dom.window.document.title;
                        data.peeks.menu = [];

                        // Original data:
                        data.source = {};
                        data.source.a = [];

                        var elems = dom.window.document.querySelectorAll("a");
                        for (var elemI in elems) {
                            var elem = elems[elemI];
                            if (elem && elem.id && elem.textContent && elem.href) {
                                var href = elem.href;
                                if (href && href[0] === '/') {
                                    href = uri + href;
                                }

                                // Predictive
                                if (elem.id.search('headerNavigationLink') === 0)
                                {
                                    data.peeks.menu.push({
                                        label: elem.textContent,
                                        href: href,
                                    });
                                }

                                // Generic
                                data.source.a.push({
                                    id: elem.id,
                                    label: elem.textContent,
                                    href: href,
                                });
                            }
                        }
                        res.send(JSON.stringify(data));
                    }
                }
            }
        );
    }
});

module.exports = router;
