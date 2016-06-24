(function () {
    angular
        .module("RestaurantApp")
        .controller("RestaurantController", RestaurantController)
        .controller("RestaurantSearchController", RestaurantSearchController)
        .controller("RestaurantListController", RestaurantListController);
    
    function RestaurantController($routeParams, RestaurantService) {
        var vm = this;

        vm.restaurantId = $routeParams['rid'];
        
        vm.user = {
            _id: '576c85bf47beeb3c0e43c343',
            rating: 4,
            review: "Bueno"
        };

        vm.userId = vm.user._id;

        function init() {
            RestaurantService
                .findRestaurantById(vm.restaurantId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
                        if (vm.user.reviews.indexOf(vm.restaurantId)) {

                        }
                    },
                    function (error) {
                        vm.alert = error.body;
                    }
                );
        }
        init();

        function addRestaurant() {
            console.log('adding');
            var restaurant = {
                name: "Andy's",
                description: "Good seafood",
                type: "Seafood",
                address: "5 Yawkey Way"
            };
            RestaurantService
                .createRestaurant(restaurant)
                .then(
                    function (response) {
                        console.log(response);
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }

        function deleteRestaurant() {
            RestaurantService
                .deleteRestaurant("576c71acbbcfd4b023127f41")
                .then(
                    function (response) {
                        console.log(response);
                    },
                    function (error) {
                        console.log(error);
                    }
                )
        }
        //addRestaurant();
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

    function RestaurantListController(RestaurantService) {
        var vm = this;
        
        vm.getMore = getMore;

        function init() {
            RestaurantService
                .findAllRestaurants()
                .then(
                    function (response) {
                        console.log(response);
                        var allRestaurants = response.data;
                        vm.restaurants = allRestaurants.slice(0, 3);
                    },
                    function (error) {
                        vm.alert = error.body;
                    }
                );
        }
        init();
        
        function getMore() {
            
        }
    }
})();