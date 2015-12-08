var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    sassMiddleware = require('node-sass-middleware'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    async = require('async');

var routes = require('./routes/index');
var recipes = require('./routes/recipes');

var mongoose = require('mongoose');

// My things
var Recipe = require('./models/recipe');
var Ingredient = require('./models/ingredient');

var server = express();

mongoose.connect('mongodb://localhost/recipes', function(err, db) {
  if (!err) {
    console.log('Connected to mongo');
  }
});

// load fixture
mongoose.connection.once('connected', function() {
  Recipe.count({}, function(err, c) {
    // Count recipes and drop
    if (err) console.log('Error retrieving Recipe count.');
    if (c > 0) {
      console.log('Removing old data from Recipes.');
      Recipe.remove({}, function(err) {
        if (err) console.log('Error removing all from Recipes.');
      });
    }
  });
  Ingredient.count({}, function(err, c) {
    if (err) console.log('Error retrieving Ingredient count.');
    if (c > 0) {
      console.log('Removing old data from Ingredient.');
      Ingredient.remove({}, function(err) {
        if (err) console.log('Error removing all from Ingredient.');
      });
    }
  });

  // read fixture and populate
  fs.readFile('./fixture/fixture.json', function(err, data) {
    if (err) throw err;
    var fix = JSON.parse(data);

    for (var id in fix) {
      for (var key in fix[id]) {
        if (key === 'Recipe') {
          new Recipe(fix[id][key]).save(function(err) {
            if (err) console.log('Error saving recipe:', err);
          });
        }
        else if (key === 'Ingredient') {
          new Ingredient(fix[id][key]).save(function(err) {
            if (err) console.log('Error saving ingredient:', err);
          });
        }
      }
    }
  });
});

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

//server.use(
//    sassMiddleware({
//      src: path.join(__dirname, 'sass'),
//      dest: path.join(__dirname, 'public/css'),
//      debug: true,
//      indentedSyntax: true,
//      outputStyle: 'compressed',
//      prefix: '/css'
//    })
//);

server.use(express.static(path.join(__dirname, '/public')));
server.use(express.static(path.join(__dirname, 'bower_components')));

server.use('/', routes);
server.use('/recipes', recipes);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
  server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: 'Error',
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: {}
  });
});

module.exports = server;
