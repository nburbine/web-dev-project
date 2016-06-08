module.exports = function () {

    var UserSchema = require("./user.schema.server");
    var mongoose = require("mongoose");
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById
    };
    return api;
    
    function createUser(user) {
        return User.create(user);
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
    
    function updateUser(userId, user) {
        return User.update(
            {_id: userId},
            {$set:
                {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }}
        );
    }
    
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
    
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }
    
    function findUserById(userId) {
        return User.findOne({_id: userId});
    }
};