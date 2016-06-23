module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        google: {
            id: String,
            token: String
        },
        reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
        friendList: {type: mongoose.Schema.Types.ObjectId, ref: 'Friendlist'},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};