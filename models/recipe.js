var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    conversion = require('../utils/conversion'),
    Ingredient = require('./ingredient');
var RecipeSchema = new Schema({
    _id: Number,
    title: {
        type: String,
        index: true
    },
    description: String,
    madeOn: [{
        type: Date,
        default: Date.now,
        validate: function (v) {
            return !isNaN(new Date(v).getTime());
        }
    }],
    ingredients: [Ingredient],
    equipment: [{
        type: String,
        index: true
    }],
    steps: [{
        text: String,
        sortOrder: Number
    }],
    notes: [String],
    tags: [{
        type: String,
        index: true
    }],
    images: [String]
});

RecipeSchema.methods.convertWeight = function () {
    for (var ing in this.ingredients) {
        if (ing.weight.units === 'grams') {
            ing.weight = conversion.gToOz(parseFloat(ing.weight.amount));
        }
        else if (ing.weight.units === 'ounces') {
            conversion.ozToG(parseFloat(ing.weight.amount));
        }
    }
};

RecipeSchema.methods.renderRecipe = function () {

};

RecipeSchema.pre('save', function (next) {
    console.log('SAVING [', this.title, ']');

    //for (var ing in this.ingredients) {
    //    if (ing.weight !== {}) {
    //        // conversion of g to oz
    //
    //        // conversion of measurement types
    //        if (ing.volume === {}) {
    //
    //        }
    //        if (ing.count === {}) {
    //            // TODO
    //        }
    //    }
    //    else if (ing.volume !== {}) {
    //        // conversion of g to oz
    //        if (ing.volume.units === 'fluid ounces') {
    //            conversion.gToOz(parseFloat(ing.weight.amount));
    //        }
    //        else if (ing.volume.units === 'milliliters') {
    //            conversion.ozToG(parseFloat(ing.weight.amount));
    //        }
    //
    //        // conversion of measurement types
    //        if (ing.weight === {}) {
    //
    //        }
    //        if (ing.count === {}) {
    //            // TODO
    //        }
    //    }
    //    else if (ing.count !== {}) {
    //        // TODO
    //        if (ing.volume === {}) {
    //
    //        }
    //        if (ing.weight === {}) {
    //
    //        }
    //    }
    //}

    next();
});

module.exports = mongoose.model('Recipe', RecipeSchema);
