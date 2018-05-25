var express = require('express');
var router = express.Router();

// curl -X POST "http://localhost:3000/mailer?email:test%40test.com&message:Some%20message"

router.post('/', function(req, res, next) {
    let email;
    let message;
    for (record in req.query) {
        let name = record.split(':')[0];
        let value = record.substring(name.length + 1);
        if (name === 'email') {
            email = value;
        } else if (name === 'message') {
            message = value;
        }
    }
    var send = require('gmail-send')({
      user: 'mailer@peeks.io',
      pass: 'wgtiootb',
      to:   'info@peeks.io',
      bcc: 'mailer@peeks.io',
      from:    email,
      replyTo: email,
      subject: 'Mail from ' + email,
      text: message,
    });

    if (email && message) {
        send({
        }, function (err, res) {
            console.log('* send() callback returned: err:', err, '; res:', res);
        });
    }

    res.send('');
});

module.exports = router;
