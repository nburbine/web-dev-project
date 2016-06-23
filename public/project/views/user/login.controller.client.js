(function () {
    angular
        .module("RestaurantApp")
        .controller("LoginController", LoginController)

    function LoginController($location) {
        var vm = this;
        // vm.login = login;

        vm.username = '';
        vm.password = '';

        //function login() {
        //    UserService
        //        .findUserByCredentials(vm.username, vm.password)
        //        .then(
        //            function (response) {
        //                var user = response.data;
        //                $location.url('/user/' + user._id);
        //            },
        //            function (error) {
        //                vm.alert = error.data;
        //            });
        //}
    }
})();