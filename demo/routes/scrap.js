var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;

function getRootUrl(url) {
  return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
}

function removeUrlTrail(url) {
    var params = url.indexOf("\?");
    if (params != -1) {
        url = url.substring(0, params);
    }
    return url;
}

var scrapDb = [
    {
        domain: 'bloomingdales.com',
        imgExclude: [
            'spacer.gif',
            'footer',
        ]
    }
];

//var redirectIp = '35.161.135.124';
var redirectIp = '52.25.54.6';
var redirectPrefix = 'http://' + redirectIp + '/?url=';
// Avoid any redirection:
redirectPrefix = "";

router.get('/', function(req, res, next) {
    var uri = req.query['uri'];
    if (uri) {
        console.log('Loading ' + uri);
        var uriRoot = getRootUrl(uri);
        var scrapDbNode;
        for (var scrapDbi = 0; scrapDbi < scrapDb.length; scrapDbi++) {
            if (uri.search(scrapDb[scrapDbi].domain) !== -1) {
                scrapDbNode = scrapDb[scrapDbi];
                break;
            }
        }
        if (uri.indexOf(redirectIp) > -1) {
            console.log('already proxy present');
        } else {
            uri=redirectPrefix+uri+'/';
        }
        uriRoot = getRootUrl(uri);
        console.log('uri=='+uri);
        request(
            {
                uri: uri,
                //maxRedirects: '100',
                jar: true, // Allow cookies to avoid infinite redirects
                // followRedirect: false,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
                },
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
                                        if (img && img.src && scrapDbNode) {
                                            for (var i = 0; i < scrapDbNode.imgExclude.length; i++) {
                                                if (img.src.search(scrapDbNode.imgExclude[i]) !== -1) {
                                                    img = undefined;
                                                    break;
                                                }
                                            }
                                        }
                                        if (img && img.src && img.alt) {
                                            var src = img.src;
                                            if (src && src[0] === '/') {
                                                if (src[1] === '/') {
                                                    src = 'https:' + src;
                                                } else {
                                                    src = uriRoot + src;
                                                }
                                            }
                                            src = removeUrlTrail(src);
                                            src = redirectPrefix + src;
                                            //console.log('adding ' + src);
                                            var node = {
                                                href: href,
                                                src: src,
                                                label: img.alt || "",
                                                width: img.width,
                                                height: img.height,
                                            };
                                            //console.log(node);
                                            data.peeks.img.push(node);
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
                                src = redirectPrefix + src;

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
