module.exports = function (app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        newPage._id = (new Date().getTime).toString();
        pages.push(newPage);
        res.json(newPage);
    }

    function findAllPagesForWebsite(req, res) {
        var websteId = req.params.websiteId;
        var matching_pages = [];
        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                matching_pages.push(pages[i]);
            }
        }
        res.send(matching_pages);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                res.json(pages[i]);
                return;
            }
        }
        res.send({});
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = page._id;

        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i].name = page.name;
                pages[i].title = page.title;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Page with ID: " + pageId + " not found");
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id === id) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(400).send("Page with ID: " + id + " not found");
    }
};