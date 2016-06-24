(function () {
    angular
        .module("RestaurantApp")
        .controller("RestaurantController", RestaurantController)
        .controller("RestaurantSearchController", RestaurantSearchController)
        .controller("RestaurantListController", RestaurantListController);
    
    function RestaurantController($routeParams, RestaurantService, UserService, ReviewService) {
        var vm = this;

        vm.restaurantId = $routeParams['rid'];
        vm.userId = '576c85bf47beeb3c0e43c343';

        function init() {
            RestaurantService
                .findRestaurantById(vm.restaurantId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
                        // if (vm.user.reviews.indexOf(vm.restaurantId)) {
                        //
                        // }
                    },
                    function (error) {
                        vm.alert = error.body;
                    }
                );
            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        vm.user = response.data;
                        console.log(vm.user);
                        return vm.user;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                )
                .then(
                    function (user) {
                        console.log(user);
                        if (vm.user) {
                            console.log('looking for review');
                            ReviewService
                                .findAllReviewsForUser(vm.userId)
                                .then(
                                    function (response) {
                                        var reviews = response.data;
                                        for (var i in reviews) {
                                            if (reviews[i]._restaurant === vm.restaurantId) {
                                                vm.review = reviews[i];
                                                return;
                                            }
                                        }
                                    },
                                    function (error) {
                                        vm.alert = error.data;
                                    }
                                )
                        }
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