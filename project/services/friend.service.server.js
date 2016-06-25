module.exports = function (app, models) {
    var userModel = models.userModel;
    
    app.get("/projectApi/user/:uid/friend", findFriendsByUserId);
    app.post("/projectApi/user/:uid/friend/:fid", AddFriendById);
    app.get("/projectApi/email/:email", findUserByEmail);
    app.post("/projectApi/friends", getFriends);

    app.delete("/projectApi/user/:uid/friend/:friendId", deleteFriend);
    function getFriends(req, res) {
        var friendsList = req.body;
        userModel
            .getFriends(friendsList)
            .then(
                function (friends) {
                    res.json(friends);
                },
                function (err) {
                    done(err, null);
                })
    }


    function deleteFriend(req, res) {
        var userId = req.params.uid;
        var friendId = req.params.friendId;
        userModel
            .deleteFriend(userId,friendId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to delete friend with ID: "+friendId);
                }
            )
    }
    
    function findFriendsByUserId(req, res) {
        var userId = req.params.uid;
        userModel
            .findFriendsByUserId(userId)
            .then(
                function (friends) {
                    res.send(friends);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function AddFriendById(req, res) {
        var userId = req.params.uid;
        var fid = req.params.fid;
        userModel
            .AddFriendById(userId, fid)
            .then(
                function (friends) {
                    res.send(friends);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function findUserByEmail(req, res) {
        var email = req.params.email;
        userModel
            .findUserByEmail(email)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    }
                    else {
                        res.status(400).send("can't find the user");
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }
};