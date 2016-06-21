(function () {
    angular
        .module("RestaurantApp")
        .controller("RestaurantController", RestaurantController)
        .controller("RestaurantSearchController", RestaurantSearchController);

    var restaurants = [
        {
            id: 0,
            name: "Andy's",
            menu: [
                {
                    name: 'Shrimp',
                    description: 'Tasty'
                },
                {
                    name: 'Fish',
                    description: 'Not as tasty'
                }
            ],
            ratings: [5, 4, 3, 4, 5],
            reviews: ['Good', 'Okay', 'Bad'],
            type: 'Seafood'
        }
    ];
    
    function RestaurantController($routeParams, RestaurantService) {
        var vm = this;

        vm.restaurantId = $routeParams['rid'];
        
        vm.user = {
            rating: 4,
            review: "Bueno"
        };

        function init() {
            vm.restaurant = restaurants[vm.restaurantId];
            var sum = 0;
            for (i in vm.restaurant.ratings) {
                sum += vm.restaurant.ratings[i];
            }
            vm.restaurant.rating = sum / vm.restaurant.ratings.length;
            console.log(vm.restaurant.menu);
        }
        init();

        
    }

    function RestaurantSearchController(RestaurantService) {
        var vm = this;

        vm.search = search;
        vm.restaurants = [];

        function search(term) {
            RestaurantService
                .findRestaurantsByTerm(term)
                .then(
                    
                )
        }
    }
})();