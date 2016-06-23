module.exports = function () {
    var mongoose = require("mongoose");

    var ReviewSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        rate: Number, // Todo add restriction on values
        review: String,
        _restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.review"});

    return ReviewSchema;
};