module.exports = function () {

    var UserSchema = require("./user.schema.server")();
    var mongoose = require("mongoose");
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;
    
    function createUser(user) {
        return User.create(user);
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
    
    function updateUser(userId, user) {
        console.log(user);
        return User.update(
            {_id: userId},
            {$set:
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
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

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }
};