var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var IngredientSchema = new Schema({
    recipe: {
        type: Number,
        ref: 'Recipe'
    },
    name: {
        type: String,
        index: true
    },
    weight: {
        amount: {
            type: String,
            validate: function (v) {
                return !isNaN(parseFloat(v));
            }
        },
        units: {
            type: String
        }
    },
    volume: {
        amount: {
            type: String,
            validate: function (v) {
                return !isNaN(parseFloat(v));
            }
        },
        units: {
            type: String
        }
    },
    count: {
        amount: {
            type: String,
            validate: function (v) {
                return !isNaN(parseFloat(v));
            }
        }
    }
});

IngredientSchema.pre('save', function(next) {
    //console.log('SAVING [', this.name, ']');
    next();
});

module.exports = mongoose.model('Ingredient', IngredientSchema);