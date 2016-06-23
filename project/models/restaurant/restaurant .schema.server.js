module.exports = function () {
    var mongoose = require("mongoose");

    var RestaurantSchema = mongoose.Schema({
        name: String,
        description: String,
        address: String,
        reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
        ratings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}],
        dateCreated: {type: Date, default: Date.now},
        menu: [
            {
                description: String,
                foodName: String,
                url: String
            }
        ]
    }, {collection: "project.restaurant"});

    return RestaurantSchema;
};