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
            findWebsitesById: findWebsitesById
        };
        return api;

        function createWebsite(userId, website) {
            var newWebsite = {
                _id: (new Date().getTime()),
                name: website.name,
                developerId: userId
            };
            websites.push(newWebsite);
            return true;
        }

        function updateWebsite(websiteId, website) {
            var site = findWebsitesById(websiteId);
            if (site) {
                site.name = website.name;
                return true;
            }
            else {
                return false;
            }
        }

        function deleteWebsite(websiteId) {
            var site = findWebsitesById(websiteId);
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

        function findWebsitesById(websiteId) {
            var sites = [];
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    sites.push(websites[i]);
                }
            }
            return sites;
        }
    }
})();