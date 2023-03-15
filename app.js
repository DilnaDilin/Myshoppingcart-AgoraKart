var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {engine:hbs}=require('express-handlebars'); 
var fileupload=require('express-fileupload');


var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');


var app = express();

const db=require('./config/connection');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs ({extname: 'hbs',defaultLayout: 'layout', layoutsDir:__dirname + '/views/layout',partialsDir:__dirname+'/views/partials'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




db.connect((err)=>{
  if(err){
    console.log("Problem in database Connection"+err)
  }else{
    console.log("Successfully connected to the database to the port 27017");
  }
});
var session=require('express-session');
app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: 600000},
  resave: false 
}));
app.use(fileupload());
app.use('/admin', adminRouter);
app.use('/', userRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
