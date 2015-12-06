var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var RecipeSchema = new Schema({
    title: {
        type: String,
        index: true
    },
    description: String,
    madeOn: [{
        type: Date,
        default: Date.now,
        validate: function(v) {
            return !isNaN(new Date(v).getTime());
        }
    }],
    ingredients: [{
        name: {
            type: String,
            index: true
        },
        weight: {
            amount: {
                type: String
            },
            units: {
                type: String
                //enum: ["grams", "ounces"]
            }
        },
        volume: {
            amount: {
                type: String
            },
            units: {
                type: String
            }
        },
        count: {
            amount: {
                type: String
            }
        }
    }],
    steps: [{
        text: String,
        sortOrder: Number
    }],
    notes: [String],
    tags: [{
        type: String,
        index: true
    }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);
