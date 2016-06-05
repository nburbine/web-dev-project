(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        
        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(
                    function (response) {
                        console.log(response);
                        var user = response.data;
                        console.log(user);
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
            
            
            if (!(vm.user = angular.copy(UserService.findUserById(vm.userId)))) {
                // redirect to login if profile does not exist
                window.location = "#/login";
            }
        }
        init();

        function updateUser() {
            var result = UserService.updateUser(vm.userId, vm.user);
            if (result) {
                vm.success = "User successfully updated";
            } else {
                vm.alert = "User not found";
            }
        }
    }
})();