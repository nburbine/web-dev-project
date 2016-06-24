(function () {
    angular
        .module("RestaurantApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            login: login,
            loggedIn: loggedIn,
            register: register,
            logout: logout,
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            checkLoggedin: checkLoggedin
        };
        return api;
        function checkLoggedin() {
            return $http.get("/projectApi/loggedin");
        }

        function loggedIn() {
            return $http.get("/projectApi/loggedIn");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/projectApi/login", user);
        }

        function logout() {
            return $http.post("/projectApi/logout");
        }

        function register(user) {
            var url = "/projectApi/register";
            return $http.post(url, user);
        }

        function updateUser(id, newUser) {
            var url = "/projectApi/user/" + id;
            return $http.put(url, newUser);
        }

        function createUser(user) {
            var url = "/projectApi/user";
            return $http.post(url, user);

        }

        function deleteUser(id) {
            var url = "/projectApi/user/" + id;
            return $http.delete(url);
        }

        function findUserByUsernameAndPassword(username, password) {
            var url = "/projectApi/user?username=" + username + "&password=" + password;
            return $http.get(url);

        }

        function findUserById(id) {
            var url = "/projectApi/user/" + id;
            return $http.get(url);
        }
    }
})();