var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
var session = require('express-session')
var compression = require('compression')
// 索引页面，管理后台、用户页面
var index = require('./server/routes/index');
var api = require('./server/routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/build'));
app.set('view engine', 'ejs');

app.use(compression());
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/src/containers/images/favicon.png'))
app.use(morgan(function (tokens, req, res) {
    console.log(req.body)
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());

require('./server/routes/config/passport.config')(passport)

app.all('/', passport.authenticate('local'))

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    if (err.status == 404){
        res.render('common/view/404')
    }else {
        res.render('common/view/error');
    }
});

module.exports = app;
