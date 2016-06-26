module.exports = function () {

    var favoriteSchema = require("./favorite.schema.server.js")();
    var mongoose = require("mongoose");
    var Favorite = mongoose.model("Favorite", favoriteSchema);

    var api = {
        createList: createList,
        findAllListsForUser: findAllListsForUser,
        findListById: findListById,
        updateList: updateList,
        deleteListForUser: deleteListForUser

    };
    return api;

    function createList(list) {
        return Favorite.create(list);
    }

    function findAllListsForUser(userId) {
        return Favorite.find({_users: userId});
    }

    function findListById(listId) {
        return Favorite.findById(listId);
    }

    function updateList(listId, list) {
        return Favorite.update(
            {_id: listId},
            {
                $set: {
                    name: list.name,
                    description: list.description
                }
            }
        );
    }

    function deleteListForUser(listId, userId) {
        return Favorite.update(
            {_id: listId},
            {
                $pull: {
                    _users: userId
                }
            }
        );
    }
};