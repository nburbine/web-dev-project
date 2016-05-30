(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

        var api = {
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById
        };
        return api;

        function createWebsite(userId, website) {
            var newWebsite = {
                _id: (new Date().getTime()).toString(),
                name: website.name,
                developerId: userId,
                description: website.description
            };
            if (!newWebsite.description) {
                newWebsite.description = ""
            }
            websites.push(newWebsite);
            return true;
        }

        function updateWebsite(websiteId, website) {
            var old_website = findWebsiteById(websiteId);
            if (old_website) {
                old_website.name = website.name;
                if (website.description) {
                    old_website.description = website.description;
                } else {
                    old_website.description = "";
                }
                return true;
            }
            else {
                return false;
            }
        }

        function deleteWebsite(websiteId) {
            var site = findWebsiteById(websiteId);
            if (site) {
                websites.splice(websites.indexOf(site), 1);
                return true;
            }
            else {
                return false;
            }
        }

        function findWebsitesByUser(userId) {
            var sites = [];
            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    sites.push(websites[i]);
                }
            }
            return sites;
        }

        function findWebsiteById(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    return websites[i];
                }
            }
            return null;
        }
    }
})();