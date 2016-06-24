module.exports = function () {
    var mongoose = require('mongoose');

    var userModel = require("./user/user.model.server.js")();
    var restaurantModel = require("./restaurant/restaurant.model.server")();
    var models = {
        userModel: userModel,
        restaurantModel: restaurantModel
    };

    return models;
};