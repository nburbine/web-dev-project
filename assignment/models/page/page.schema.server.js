module.exports = function () {
    var mongoose = require("mongoose");
    
    var PageSchema = mongoose.Schema({
        _website: Website,
        name: String,
        title: String,
        description: String,
        widgets: [Widget],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.page"});

    return PageSchema;
};