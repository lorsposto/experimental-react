var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    async = require('async'),
    fs = require('fs');

var routes = require('./api/routes');

var app = express();

var mongoose = require('mongoose');

// My things
var Recipe = require('./models/recipe');
var Ingredient = require('./models/ingredient');

mongoose.connect('mongodb://localhost/recipes', function (err, db) {
    if (!err) {
        console.log('Connected to mongo');
    }
});

// load fixture
mongoose.connection.once('connected', function () {
    Recipe.count({}, function (err, c) {
        // Count recipes and drop
        if (err) console.log('Error retrieving Recipe count.');
        if (c > 0) {
            console.log('Removing old data from Recipes.');
            Recipe.remove({}, function (err) {
                if (err) console.log('Error removing all from Recipes.');
            });
        }
    });
    Ingredient.count({}, function (err, c) {
        if (err) console.log('Error retrieving Ingredient count.');
        if (c > 0) {
            console.log('Removing old data from Ingredient.');
            Ingredient.remove({}, function (err) {
                if (err) console.log('Error removing all from Ingredient.');
            });
        }
    });

    // read fixture and populate
    fs.readFile('./fixture/fixture.json', function (err, data) {
        if (err) throw err;
        var fix = JSON.parse(data);

        async.forEachOf(fix, function(item, id, cb1) {
            async.forEachOf(item, function(obj, key, cb2) {
                if (key === 'Recipe') {
                    new Recipe(obj).save(function (err) {
                        if (err) {
                            cb2(err);
                        }
                        cb2();
                    });
                }
                else if (key === 'Ingredient') {
                    new Ingredient(obj).save(function (err) {
                        if (err) {
                            cb2(err);
                        }
                        cb2();
                    });
                }
            }, function(err) {
                if (err) {
                    cb1(err);
                }
                cb1();
            });
        }, function(err) {
            if (err) {
                console.log(err);
            }
            console.log("Finished loading data fixture.");
        });
    });
});

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    console.log(req.url);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
});


module.exports = app;
