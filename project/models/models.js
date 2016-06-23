module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cs4550');

    var userModel = require("./user/user.model.server.js")();
    var restaurantModel = require("./restaurant/restaurant.model.server")();

    var models = {
        userModel: userModel,
        restaurantModel: restaurantModel
    };

    return models;
};