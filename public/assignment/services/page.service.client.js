(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        var api = {
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById
        };
        return api;

        function createPage(websiteId, page) {
            var newPage = {
                _id: (new Date().getTime()).toString(),
                name: page.name,
                websiteId: websiteId
            };
            pages.push(newPage);
            return true;
        }

        function updatePage(pageId, page) {
            var old_page = findPageById(pageId);
            old_page.name = page.name;
            return true;
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            pages.splice(pages.indexOf(page), 1);
            return true;
        }

        function findPagesByWebsiteId(websiteId) {
            var matching_pages = [];
            for (var i in pages) {
                if (pages[i].websiteId === websiteId) {
                    matching_pages.push(pages[i]);
                }
            }
            return matching_pages;
        }

        function findPageById(pageId) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    return pages[i];
                }
            }
            return null;
        }
    }
})();