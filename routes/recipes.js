var express = require('express'),
    Recipes = require('../models/recipe'),
    Ingredient = require('../models/ingredient'),
    JSX = require('node-jsx').install(),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    reactRecipe = React.createFactory(require('../components/Recipe.jsx')),
    reactIngredient = React.createFactory(require('../components/Ingredient.jsx')),
    reactRecipeSquare = React.createFactory(require('../components/RecipeSquare.jsx')),
    reactRecipeGrid = React.createFactory(require('../components/RecipeGrid.jsx')),
    reactRecipeForm = React.createFactory(require('../components/RecipeForm.jsx')),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();

var router = express.Router();

router.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get('/', function(err, res, next) {
    Recipes.find({}, function(err, recipes) {
        var imgSquares = [];
        var jsonData = [];
        async.each(recipes, function (r, callback) {
            jsonData.push({"_id": r._id, "image": r.images[0]});
            imgSquares.push(reactRecipeSquare({_id: r._id, image: r.images[0]}));
            callback();
        }, function(err) {
            jsonData = JSON.stringify(jsonData);
            res.render('recipes', {
                reactOutput: ReactDOMServer.renderToString(reactRecipeGrid({squares: imgSquares})),
                scripts: '<script src="/js/client/renderRecipeSquare.js"></script>',
                data: jsonData
            })
        });
    });
});

router.get('/:recipe_id([0-9]+)', function(err, res, next) {

});

router.post('/new/submit', multipartMiddleware, function(req, res, next) {
    async.forEachOf(req.files, (value, key, callback) => {
        async.waterfall([
            (callback) => {
                fs.readFile(req.files[key]['path'], (err, data) => {
                    var savePath = path.join(path.resolve('uploads'), req.files[key]['name']);
                    callback(null, savePath, data);
                });
            },
            (savePath, data, callback) => {
                fs.writeFile(savePath, data, (err) => {
                    if(err) {
                        callback(savePath);
                    } else {
                        callback(null, savePath);
                    }
                });
            }
        ],
            (err, savePath) => {
                if (err) {
                    console.log('1 Error saving', savePath, ':', err);
                    callback(savePath);
                } else {
                    console.log(savePath, 'saved!');
                    callback();
                }
            });
    }, (err) => {
        if (err) {
            console.log('500 Error saving:', err);
            res.status(500).send({'error':err});
        }
        else {
            console.log('Redirecting...');
            res.redirect('/recipes');
        }
    });
});

router.get('/new', function(err, res, next) {
    res.render('recipes', {
        reactOutput: ReactDOMServer.renderToString(reactRecipeForm({})),
        scripts: '<script src="/js/client/renderNewRecipeForm.js"></script>',
        data: ''
    });
});

router.get('/list', function(req, res, next) {
    var recipeMarkup = '';

    Recipes.find({}, function(err, recipes) {
        async.each(recipes, function (r, callback) {
            var ingredientObjects = [];
            Ingredient.find({recipe: r._id}, function(err, ingredients) {
                async.each(ingredients, function (i, cb) {
                    ingredientObjects.push(reactIngredient({
                        key: i._id,
                        amount: i.volume.amount,
                        units: i.volume.units,
                        name: i.name
                    }));
                    cb();
                }, function (err) {
                    recipeMarkup += ReactDOMServer.renderToString(reactRecipe({
                        key: r._id,
                        name: r.title,
                        ingredients: ingredientObjects,
                        steps: r.steps,
                        image: r.images[0]
                    }));
                    callback();
                });
            });
        }, function (err) {
            res.render('recipes', {
                title: "Recipes",
                reactOutput: recipeMarkup
            });
        });
    });
});

module.exports = router;
