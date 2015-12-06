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

RecipeSchema.pre('save', function(next) {
    console.log("Saving:", this.title);

    for(var ing in this.ingredients) {
        if(ing.weight !== {}) {
            if(ing.volume === {}) {

            }
            if(ing.count === {}) {

            }
        }
        else if(ing.volume !== {}) {
            if(ing.weight === {}) {

            }
            if(ing.count === {}) {

            }
        }
        else if (ing.count !== {}) {
            if(ing.volume === {}) {

            }
            if(ing.weight === {}) {

            }
        }
    }

    next();
});

module.exports = mongoose.model('Recipe', RecipeSchema);
