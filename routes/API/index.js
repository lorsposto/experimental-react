var express = require('express'),
    Recipes = require('../models/recipe'),
    Ingredient = require('../models/ingredient'),
    JSX = require('node-jsx').install(),
    React = require('react'),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();

var getAllRecipes = require('../utils').getAllRecipes;

var router = express.Router();

/**
 * Get all recipes for tiling page
 */
router.get('/all', function(err, req, res, next) {
    var recipes = getAllRecipes();
    console.log("All Recipes:");
    console.log(recipes);
    console.log("gotta respond");
});

module.exports = router;