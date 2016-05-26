(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials
        };
        return api;

        function createUser(user) {
            users.push(user);
            return true;
        }

        function updateUser(userId, user) {
            var old_user = findUserById(userId);
            if (old_user) {
                old_user.firstname = user.firstname;
                old_user.lastname = user.lastname;
                return true;
            }
            else {
                return false;
            }
        }

        function deleteUser(userId) {
            var user = findUserById(userId);
            if (user) {
                users.splice(users.indexOf(user), 1);
                return true;
            }
            else {
                return false;
            }
        }

        function findUserById(userId) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username === username) {
                    return users[i];
                }
            }
            return false;
        }

        function findUserByCredentials(username, password) {
            for (var i in users) {
                if (users[i].username === username &&
                    users[i].password === password) {
                    return users[i];
                }
            }
            return false;
        }
    }
})();