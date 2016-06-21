(function () {
    angular
        .module("RestaurantApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($routeParams) {
        var vm = this;
        vm.updateUser = updateUser;
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


        vm.userId = $routeParams['id'];
        function init() {
            vm.restaurants = restaurants;
            //UserService
            //    .findUserById(vm.userId)
            //    .then(
            //        function (response) {
            //            vm.user = response.data;
            //        },
            //        function (error) {
            //            // If user not found, redirect to login
            //            window.location = "#/login";
            //        });
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
    }
})();