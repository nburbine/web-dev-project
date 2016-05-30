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
                $location.url('/profile/' + user._id);
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
        
        vm.userId = $routeParams['id'];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
    }
})();