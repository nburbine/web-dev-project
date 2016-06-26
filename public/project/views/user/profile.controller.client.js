(function () {
    angular
        .module("RestaurantApp")
        .controller("ProfileController", ProfileController);
    var restaurants = [{
        restaurantsname: "foodhouse1",
        discription: "place3Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See t"
    },
        {
            restaurantsname: "foodhouse2",
            discription: "good place3Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See the detailed description on Franz Josef restaurant or the Café-bar for ..."
        },
        {
            restaurantsname: "foodhouse2",
            discription: "good place3 Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See the detailed description on Franz Josef restaurant or the Café-bar for ..."
        }];


    function ProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        vm.id = $routeParams["id"];
        vm.logout = logout;

        vm.updateUser = updateUser;
        vm.unregister = unregister;

        function init() {
            vm.restaurants = restaurants;
            UserService
                .findUserById(vm.id)
                .then(function (response) {
                    vm.user = response.data;
                });
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    },
                    function (error) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    });
        }

        function unregister() {
            UserService
                .deleteUser(model.user._id)
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function updateUser() {
            console.log(vm.user);
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function (response) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )

        }
    }
})();