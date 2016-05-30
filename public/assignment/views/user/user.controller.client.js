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
    
    function RegisterController() {
        var vm = this;
    }
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        
        vm.userId = $routeParams['id'];
        function init() {
            vm.user = angular.copy(UserService.findUserById(vm.userId));
        }
        init();

        function updateUser() {
            var result = UserService.updateUser(vm.userId, vm.user);
            console.log(result);
            if (result) {
                vm.success = "User successfully updated";
            } else {
                vm.alert = "User not found";
            }
        }
    }
})();