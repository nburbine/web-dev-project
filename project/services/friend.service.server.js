module.exports = function (app, models) {
    var userModel = models.userModel;
    
    app.get("/projectApi/user/:uid/friend", findFriendsByUserId);
    app.post("/projectApi/user/:uid/friend/:email", AddFriendByEmail);
    app.delete("/projectApi/user/:uid/friend/:friendId", deleteFriend);
    
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

    
    function AddFriendByEmail(req, res) {
        var userId = req.params.uid;
        var email = req.params.email;
        userModel
            .addFriend(userId, email)
            .then(
                function (friend) {
                    res.send(friend);
                },
                function (error) {
                    res.status(400).send("No friend found");
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
};