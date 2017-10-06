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
                        data.peeks.images = [];

                        // Original data:
                        data.source = {};
                        data.source.a = [];
                        data.source.img = [];

                        // references
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

                        // Image assets
                        elems = dom.window.document.querySelectorAll("img");
                        for (var elemI in elems) {
                            var elem = elems[elemI];
                            if (elem && elem.src && elem.width && elem.height) {
                                var src = elem.src;
                                if (src && src[0] === '/') {
                                    src = uri + src;
                                }

                                // Redirection so that we can get around
                                //  data loading without worrying about CORS
                                //  issues.
                                src = 'http://35.161.135.124/?url=' + src;

                                data.source.img.push({
                                    src: src,
                                    width: elem.width,
                                    height: elem.height,
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
