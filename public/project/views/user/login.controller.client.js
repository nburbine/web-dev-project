(function () {
    angular
        .module("RestaurantApp")
        .controller("LoginController", LoginController)

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;
        function login() {
            UserService
                .login(vm.username, vm.password)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
                            var id = user._id;
                            $location.url("/user/" + id);
                        } else {
                            vm.error = "incorrect username or password";
                        }
                    },
                    function (error) {
                        vm.error = "User not found";
                    }
                );

        }
    }
})();