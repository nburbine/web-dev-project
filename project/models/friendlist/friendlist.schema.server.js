module.exports = function () {
    var mongoose = require("mongoose");

    var FriendlistSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.friendlist"});

    return FriendlistSchema;
};