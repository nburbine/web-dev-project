module.exports = function (app, models) {
    var userModel = models.userModel;
    var favoriteModel = models.favoriteModel;

    app.post("/projectApi/list", createList);
    app.get("/projectApi/user/:uid/list", findAllListsForUser);
    //createList: createList,
    //    findAllListsForUser: findAllListsForUser,
    //    findListById: findListById,
    //    updateList: updateList,
    app.delete("/projectApi/user/:uid/list/:lid", deleteListForUser);
    //    deleteListForUser: deleteListForUser


    function createList(req, res) {
        var newlist = req.body;
        favoriteModel
            .createList(newlist)
            .then(
                function (list) {
                    res.send(list);
                },
                function (error) {
                    res.status(400).send(error);
                })
    }

    function findAllListsForUser(req, res) {
        var userId = req.params.uid;
        favoriteModel
            .findAllListsForUser(userId)
            .then(
                function (favorite) {
                    res.send(favorite);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function deleteListForUser(req, res) {
        var uid = req.params.uid;
        var lid = req.params.lid;
        favoriteModel
            .deleteListForUser(lid, uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send("Unable to remove list with ID: " + lid);
                }
            );
    }


};