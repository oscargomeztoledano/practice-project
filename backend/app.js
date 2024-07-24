var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var playersRouter = require('./routes/players.js');
var teamsRouter = require('./routes/teams.js');
var matchesRouter = require('./routes/matches.js');
var groupsRouter = require('./routes/groups.js');

var app = express();
var debug = require('debug')('backend:server');

var bodyParser  = require("body-parser");   //nuevo
var cors = require('cors');   //nuevo
var mongoose = require('mongoose');
app.use(cors());  //nuevo
app.use(bodyParser.json({limit: '50mb'}));  //nuevo
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));   //nuevo
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexion a la base de datos
require('dotenv').config();
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to the database');
})
.catch((error) => {
  console.error('Error connecting to the database:', error);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Dependiendo de lo que llegue se manda a una ruta u a otra
app.use('/players', playersRouter);
app.use('/teams', teamsRouter);
app.use('/matches', matchesRouter);
app.use('/groups', groupsRouter);

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
