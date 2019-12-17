var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
const url = require("url");

var app = express();

function vaildUri(uri) {
    let uris = [
        '/users/login',
        '/users/logout',
        '/goods'
    ]
    return uris.includes(uri)
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    console.error(req.headers.origin)
    // console.log('执行中间件...-> 必须调用尾函数next才能进入下一个中间件：');
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        // res.send(200); /让options请求快速返回/
        res.sendStatus(200);
    } else {
        console.error(JSON.stringify(req.cookies))
        if (req.cookies!=null && req.cookies && req.cookies.userId!=undefined) {
            next();
        } else {
            const urlobj = url.parse(req.url);
            // console.error(urlobj.pathname)
            //白名单设置
            if (vaildUri(urlobj.pathname)) {
                next()
            } else {
                res.json({
                    status: '10001',
                    msg: '未登录',
                    result: ''
                })
            }
        }
    }
    console.log('res:' + res.statusCode);
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
