var express = require('express'),
    Recipes = require('../models/recipe'),
    Ingredient = require('../models/ingredient'),
    JSX = require('node-jsx').install(),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    reactRecipe = React.createFactory(require('../components/Recipe.jsx')),
    reactIngredient = React.createFactory(require('../components/Ingredient.jsx')),
    async = require('async');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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
                reactoutput: recipeMarkup
            });
        });
    });
});

module.exports = router;
