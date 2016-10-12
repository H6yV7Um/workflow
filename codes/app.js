var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var member = require('./routes/member');
var task = require('./routes/task');
var project = require('./routes/project');
var oaApi = require('./routes/api/auth/oa');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionMiddleware = session({
    name: 'omportal.sid',
    secret: 'om_portal_c',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 } //for one year
});
app.use(sessionMiddleware);

app.use('/', routes);
  
app.use('/member', member);
app.use('/task', task);
app.use('/project', project);

app.use(function(req, res, next) {
  next();return;
  if(!req.session['user']) {
        console.log(req.originalUrl);
        req.session['redirecturl'] = req.originalUrl;
        oaApi.login(req, res, req.originalUrl, next);
    } else {
        next()
    }
});


//退出
app.get('/logout', (req, res) => {
    req.session['user'] = null;
    req.session['devnetAccountns'] = null;
    var url = encodeURIComponent(req.protocol + '://' + req.get('host'));
    res.redirect('http://passport.oa.com/modules/passport/signout.ashx?url=' + url);
});




module.exports = app;
