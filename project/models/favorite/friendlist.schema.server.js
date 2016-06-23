module.exports = function () {
    var mongoose = require("mongoose");

    var favoriteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.favorite"});

    return favoriteSchema;
};