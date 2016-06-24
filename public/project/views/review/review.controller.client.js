(function () {
    angular
        .module("RestaurantApp")
        .controller("ReviewListController", ReviewListController);
    
    function ReviewListController($routeParams, ReviewService) {
        var vm = this;

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
    }
})();