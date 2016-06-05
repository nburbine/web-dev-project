module.exports = function (app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        newWebsite._id = (new Date().getTime()).toString();
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var sites = [];

        for (var i in websites) {
            if (websites[i].developerId === userId) {
                sites.push(websites[i]);
            }
        }
        res.send(sites);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;

        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                res.json(websites[i]);
                return;
            }
        }
        res.send({})
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = website._id;
        var old_website = findWebsiteById(websiteId);

        if (old_website) {
            old_website.name = website.name;
            if (website.description) {
                old_website.description = website.description;
            } else {
                old_website.description = "";
            }
            res.send(200);
            return;
        }
        else {
            res.status(400).send("Website with ID: " + websiteId + " not found");
        }
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var site = findWebsiteById(websiteId);

        if (site) {
            websites.splice(websites.indexOf(site), 1);
            res.send(200);
        }
        else {
            res.status(400).send("Website with ID: " + websiteId + " not found");
        }
    }
};