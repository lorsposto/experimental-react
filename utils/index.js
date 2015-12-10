var Recipes = require('../models/recipe'),
    async = require('async');

exports.getAllRecipes = function () {
    Recipes.find({}, function(err, recipes) {
        var jsonData = [];
        async.each(recipes, function (r, callback) {
            jsonData.push({"_id": r._id, "image": r.images[0]});
            callback();
        }, function(err) {
            if (err) {
                console.log("Error getting all recipes");
                return {'err': 'Error getting all recipes'};
            }
            return jsonData;
        });
    });
};