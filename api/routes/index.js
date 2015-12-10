var express = require('express');
var router = express.Router(),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    mongoose = require('mongoose'),
    Recipe = require('../../models/recipe'),
    Ingredient = require('../../models/ingredient');

router.get('/api/recipes/all', multipartMiddleware, function(req, res, next) {
    console.log('request for all');
    Recipe.find({}, (err, recipes) => {
        var data = [];
        for(var recipe of recipes) {
            data.push({
                '_id': recipe._id,
                'image': recipe.images[0]
            })
        }
        res.status(200).send({'data': data});
    });
});

/* GET home page. */
router.post('/api/recipes/new/submit', multipartMiddleware, function (req, res, next) {
    console.log(req.body);
    console.log(req.files);
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
            console.log('OK...');
            res.status(200).send();
        }
    });
});

module.exports = router;
