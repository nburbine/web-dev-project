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
            var user = UserService.findUserByCredentials(username, password);
            if(user) {
                $location.url('/user/' + user._id);
            } else {
                vm.alert = "Unable to login";
            }
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
            } else if (! (result = UserService.createUser(vm.user))) {
                vm.alert = "Username taken";
            } else {
                window.location = "#/user/" + result.toString();
            }
        }
    }
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        
        vm.userId = $routeParams['id'];
        console.log(vm.userId);
        function init() {
            vm.user = angular.copy(UserService.findUserById(vm.userId));
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