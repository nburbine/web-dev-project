module.exports = function () {

    var WebsiteSchema = require("./website.schema.server.js");
    var mongoose = require("mongoose");
    var website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite,
        findWebsiteByUsername: findWebsiteByUsername,
        findWebsiteByCredentials: findWebsiteByCredentials,
        findWebsiteById: findWebsiteById
    };
    return api;
    
    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return Website.create(website);
    }
    
    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
    
    function updateWebsite(websiteId, website) {
        return Website.update(
            {_id: websiteId},
            {$set:
                {
                    firstName: website.firstName,
                    lastName: website.lastName
                }}
        );
    }
    
    function findWebsiteByUsername(websiteId) {
        return Website.findOne({_id: websiteId});
    }
    
    function findWebsiteById(userId) {
        return Website.findOne({_id: userId});
    }
};