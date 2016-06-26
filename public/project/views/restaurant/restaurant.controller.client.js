(function () {
    angular
        .module("RestaurantApp")
        .controller("RestaurantController", RestaurantController)
        .controller("RestaurantSearchController", RestaurantSearchController)
        .controller("RestaurantListController", RestaurantListController);
    
    function RestaurantController($routeParams, RestaurantService, UserService, ReviewService) {
        var vm = this;

        vm.restaurantId = $routeParams['rid'];
        vm.userId = '57700e9e17e3315804c4de28';
        vm.populateStars = populateStars;

        function init() {
            RestaurantService
                .findRestaurantById(vm.restaurantId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
                        console.log(vm.restaurant.reviews.type);
                        return vm.restaurant.reviews;
                    },
                    function (error) {
                        vm.alert = error.body;
                        console.log(vm.alert);
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
                );
            ReviewService
                .findAllReviewsForRestaurant(vm.restaurantId)
                .then(
                    function (response) {
                        vm.restaurant.reviews = [];

                        var reviews = response.data;
                        var sum = 0;
                        var numReviews = reviews.length;

                        for (var i in reviews) {
                            if (reviews[i]._user === vm.userId) {
                                vm.review = reviews[i];
                                console.log('user review: ', reviews[i]);
                            }
                            if (reviews[i].review) {
                                vm.restaurant.reviews.push(reviews[i]);
                            }
                            sum += reviews[i].rate;
                        }
                        vm.restaurant.rating = sum / numReviews;
                        vm.restaurant.numRatings = numReviews;
                        populateStars(vm.restaurant._id, vm.restaurant.rating);
                    },
                    function (error) {
                        vm.alert = error.data;
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

        function populateStars(id, rate) {
            var starId = id+" star-"+Math.ceil(rate);
            document.getElementById(starId).checked = true;
        }
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