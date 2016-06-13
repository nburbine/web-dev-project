module.exports = function () {

    var WebsiteSchema = require("./website.schema.server.js")();
    var mongoose = require("mongoose");
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
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
                    name: website.name,
                    description: website.description
                }}
        );
    }
    
    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }
    
    function findWebsiteById(websiteId) {
        return Website.findOne({_id: websiteId});
    }
};