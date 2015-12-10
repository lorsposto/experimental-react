var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    sassMiddleware = require('node-sass-middleware'),
    JSX = require('node-jsx').install(),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    async = require('async'),
    match = require('react-router').match,
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    Browser = React.createFactory(require('./components/Browser.jsx')),
    RoutingContext = React.createFactory(require('react-router').RoutingContext),
    routes = require('./components/routes.jsx');

var mongoose = require('mongoose');

// My things
var Recipe = require('./models/recipe');
var Ingredient = require('./models/ingredient');

var server = express();
var fetch = require('./routes/fetch');

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

server.use('/public', express.static(path.join(__dirname, '/public')));
server.use('/public', express.static(path.join(__dirname, 'bower_components')));

server.use('/fetch', fetch);

server.use(function(req, res, next) {
    match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            res.status(200).render('recipes', {
                reactContent: ReactDOMServer.renderToString(RoutingContext({
                                history: renderProps['history'],
                                location: renderProps['location'],
                                components: renderProps['components'],
                                routes: renderProps['routes'],
                                params: renderProps['params']
                            }))
                // dis shit
            });
        } else {
            //res.status(404).send('Not found')
            console.log("404 Not Found");
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
    });
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
