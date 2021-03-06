(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        vm.username = '';
        vm.password = '';
        
        function login() {
            UserService
                .findUserByCredentials(vm.username, vm.password)
                .then(
                    function (response) {
                        var user = response.data;
                        $location.url('/user/' + user._id);
                    },
                    function (error) {
                        vm.alert = error.data;
                    });
        }
    }
    
    function RegisterController(UserService) {
        var vm = this;
        vm.addUser = addUser;

        vm.user = {
            username: "",
            password: "",
            verifyPassword: ""
        };
        function addUser() {
            if (vm.user.username.length === 0 ||
                vm.user.password.length === 0 ||
                vm.user.verifyPassword.length === 0) {
                vm.alert = "Please enter username and passwords";
            } else if (!(vm.user.password === vm.user.verifyPassword)) {
                vm.alert = "Passwords don't match";
            } else {
                result = UserService
                    .createUser(vm.user)
                    .then(
                        function (response) {
                            var id = response.data._id;
                            window.location = "#/user/" + id;
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    )
            }
        }
    }
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        
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
            console.log("comehere");
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
    }
})();