module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cs4550');

    var userModel = require("./user/user.model.server.js")();


    var models = {
        userModel: userModel

    };

    return models;
};