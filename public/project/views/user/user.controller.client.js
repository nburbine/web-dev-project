(function () {
    angular
        .module("RestaurantApp")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
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

    function RegisterController() {
        var vm = this;
      //  vm.addUser = addUser;

        vm.user = {
            username: "",
            password: "",
            verifyPassword: ""
        };
        //function addUser() {
        //    if (vm.user.username.length === 0 ||
        //        vm.user.password.length === 0 ||
        //        vm.user.verifyPassword.length === 0) {
        //        vm.alert = "Please enter username and passwords";
        //    } else if (!(vm.user.password === vm.user.verifyPassword)) {
        //        vm.alert = "Passwords don't match";
        //    } else {
        //        result = UserService
        //            .createUser(vm.user)
        //            .then(
        //                function (response) {
        //                    var id = response.data._id;
        //                    window.location = "#/user/" + id;
        //                },
        //                function (error) {
        //                    vm.alert = error.data;
        //                }
        //            )
        //    }
        //}
    }

})();