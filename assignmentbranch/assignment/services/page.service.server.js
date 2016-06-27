module.exports = function (app, models) {

    var pageModel = models.pageModel;

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456" }
    // ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        pageModel
            .createPage(newPage.websiteId, newPage)
            .then(
                function (page) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.send(pages);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.send(page);
                },
                function (error) {
                    res.send(error);
                }
            )
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = page._id;
        pageModel
            .updatePage(pageId, page)
            .then(
                function (page) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        pageModel
            .deletePage(id)
            .then(
                function (page) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }
};