var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/scrap', require('./routes/scrap'));
app.use('/reco', require('./routes/reco'));
app.use('/target', require('./routes/target'));
app.use('/fortinet', require('./routes/fortinet'));
app.use('/tron', require('./routes/tron'));
app.use('/sportrade', require('./routes/sportrade'));
app.use('/mannequin', require('./routes/mannequin'));
app.use('/shoe', require('./routes/shoe'));
app.use('/kirkwood', require('./routes/kirkwood'));
app.use('/kenzo', require('./routes/kenzo'));
app.use('/louisvuitton', require('./routes/louisvuitton'));
app.use('/frye', require('./routes/frye'));
app.use('/wgtiootb', require('./routes/demo'));
app.use('/greetings', require('./routes/greetings'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
