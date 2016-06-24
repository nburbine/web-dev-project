(function () {
    angular
        .module("RestaurantApp")
        .controller("ReviewController", ReviewController);
    function ReviewController($routeParams, ReviewService) {
        var vm = this;
        vm.updateUser = updateUser;
        // var restaurants = [{
        //     restaurantsname: "foodhouse1",
        //     discription: "place3Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See t",
        //     review: "I hate this one "
        // },
        //     {
        //         restaurantsname: "foodhouse2",
        //         discription: "good place3Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See the detailed description on Franz Josef restaurant or the Café-bar for ...",
        //         review: "I love this one "
        //     },
        //
        //
        //     {
        //         restaurantsname: "foodhouse2",
        //         discription: "good place3 Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See the detailed description on Franz Josef restaurant or the Café-bar for ...",
        //         review: "I hate this one too"
        //     }];


        vm.userId = $routeParams['id'];
        function init() {
            ReviewService
                .findAllReviewsForUser(vm.userId)
                .then(
                    function (response) {
                        vm.reviews = response.data;
                    },
                    function (error) {
                        vm.alert = error.body;
                    }
                )
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