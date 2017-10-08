var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

function getRootUrl(url) {
  return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
}

router.get('/', function(req, res, next) {
    var uri = req.query['uri'];
    if (uri) {
        console.log('Loading ' + uri);
        //var uriRoot = uri;
        var uriRoot = getRootUrl(uri);
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
                        data.peeks.img = [];

                        // Original data:
                        data.source = {};
                        data.source.a = [];
                        data.source.img = [];

                        // references
                        var elems = dom.window.document.querySelectorAll("a");
                        for (var elemI in elems) {
                            var elem = elems[elemI];
                            if (elem && elem.href) {
                                var href = elem.href;
                                if (href && href[0] === '/') {
                                    href = uriRoot + href;
                                }

                                // Predictive
                                if (elem.textContent &&
                                    elem.id &&
                                    elem.id.search('headerNavigationLink') === 0)
                                {
                                    data.peeks.menu.push({
                                        label: elem.textContent,
                                        href: href,
                                    });
                                } else {
                                    var imgs = elem.getElementsByTagName("IMG");
                                    if (imgs) {
                                        img = imgs[0];
                                        if (img && img.src && img.alt) {
                                            var src = img.src;
                                            if (src && src[0] === '/') {
                                                src = uriRoot + src;
                                            }
                                            src = 'http://35.161.135.124/?url=' + src;
                                            data.peeks.img.push({
                                                href: href,
                                                src: src,
                                                label: img.alt,
                                                width: 200,
                                                height: 200,
                                            });
                                        }
                                    }
                                    // Extract <a> with embedded <img> nodes
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
                                    src = uriRoot + src;
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
