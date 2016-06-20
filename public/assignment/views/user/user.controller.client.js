(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    
    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;

        vm.username = '';
        vm.password = '';
        
        function login() {
            if (vm.username.length == 0 ||
                vm.password.length === 0) {
                vm.alert = 'Please enter username and password';
            } else {
                UserService
                    .login(vm.username, vm.password)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user) {
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
                            }
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    );
            }
        }
    }
    
    function RegisterController(UserService, $rootScope, $location) {
        var vm = this;
        vm.register = register;

        vm.user = {
            username: "",
            password: "",
            verifyPassword: ""
        };
        
        function register() {
            if (vm.user.username.length === 0 ||
                vm.user.password.length === 0 ||
                vm.user.verifyPassword.length === 0) {
                vm.alert = "Please enter username and passwords";
            } else if (!(vm.user.password === vm.user.verifyPassword)) {
                vm.alert = "Passwords must match";
            } else {
                UserService
                    .register(vm.user.username, vm.user.password)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    )
            }
        }
    }
    
    function ProfileController($routeParams, UserService, $rootScope) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.logout = logout;
        
        vm.userId = $routeParams['id'];
        function init() {
            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        vm.user = response.data;
                    },
                    function (error) {
                        // If user not found, redirect to login
                        window.location = "#/login";
                    });
        }
        init();

        function updateUser() {
            UserService
                .updateUser(vm.userId, vm.user)
                .then(
                    function (response) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.alert = error.data;
                    });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $rootScope.currentUser = null;
                        window.location = "#/login";
                    },
                    function () {
                        $rootScope.currentUser = null;
                        window.location = "#/login";
                    }
                );
        }
    }
})();