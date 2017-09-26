var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
request(
    {
        uri: 'https://www.bloomingdales.com/',
        //uri: 'https://www.bloomingdales.com/shop/womens-apparel/designer-dresses?id=21683',
        //uri: 'https://hopeful-buckeye-179215.appspot.com',
        //maxRedirects: '100',
        jar: true, // Allow cookies to avoid infinite redirects
        //followRedirect: false,
    },
    function (error, response, html) {
        if (!error) {
            if (response.statusCode == 200) {
                var dom = new JSDOM(html);
                var page = cheerio.load(html);
                var header = page('header');
                var body = page('body');
                var footer = page('footer');
                if (body) {
                    console.log(1);
//                    console.log(body);
                    console.log(dom);
                    console.log(dom.window.document.title);
                    console.log(dom.window.document.body);
                    console.log(2);
                }
            } else {
                console.log('statusCode:', response.statusCode);
            }
        } else {
            console.log('cant parse webpage');
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        }
    }
);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Peeks' });
});

module.exports = router;
