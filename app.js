var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require("multer");
const {
  ConnectionPoolClearedEvent
} = require('mongodb');
const objMulter = multer({
  dest: "./public/upload/user"
})

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(objMulter.any())
app.use(cookieParser({
  user: "news",
  keys: ["aaa", "bbb", "ccc"],
  maxAge: 1000 * 3600 * 24
}));

app.use("/adm", express.static(path.join(__dirname, 'public/admin')));
// app.use(express.static(path.join(__dirname, 'newApp')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/template')));


app.use("/", require("./ults/params"))
app.use("/api/reg", require("./routes/api/reg"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/news", require("./routes/api/news"))
app.use("/api/user", require("./routes/api/user"))
app.use("/api/is-token", require("./routes/api/is-token"))

// app.use("/api/home", require("./routes/api/home"))
// app.use("/api/follow", require("./routes/api/follow")) 
// app.use("/api/column", require("./routes/api/column"))

app.use("/", require("./routes/static/all"))

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