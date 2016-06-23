module.exports = function () {
    var mongoose = require("mongoose");

    var RestaurantSchema = mongoose.Schema({
        name: String,
        description: String,
        address: String,
        reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.restaurant"});

    return RestaurantSchema;
};