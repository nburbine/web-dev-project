(function () {
    angular
        .module("RestaurantApp")
        .controller("RestaurantController", RestaurantController)
        .controller("RestaurantSearchController", RestaurantSearchController)
        .controller("RestaurantListController", RestaurantListController);
    
    function RestaurantController($routeParams, RestaurantService, UserService, ReviewService, $location) {
        var vm = this;

        vm.restaurantId = $routeParams['rid'];
        vm.populateStars = populateStars;
        vm.searchRestaurant = searchRestaurant;
        function searchRestaurant(keyword) {
            if (!keyword) {
            } else {
                $location.url("/search/" + keyword);
            }
        }

        function init() {
            UserService
                .checkLoggedin()
                .then(
                    function (response) {
                        if (!(response.data === "0")) {
                            vm.user = response.data;
                        }
                    }
                );

            RestaurantService
                .findRestaurantById(vm.restaurantId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
                        return vm.restaurant.reviews;
                    },
                    function (error) {
                        vm.alert = error.body;
                        console.log(vm.alert);
                    }
                );
            // UserService
            //     .findUserById(vm.userId)
            //     .then(
            //         function (response) {
            //             vm.user = response.data;
            //             console.log(vm.user);
            //             return vm.user;
            //         },
            //         function (error) {
            //             vm.alert = error.data;
            //         }
            //     );
            ReviewService
                .findAllReviewsForRestaurant(vm.restaurantId)
                .then(
                    function (response) {
                        vm.restaurant.reviews = [];

                        var reviews = response.data;
                        console.log(reviews);
                        var sum = 0;
                        var numReviews = reviews.length;

                        for (var i in reviews) {
                            if (vm.user && (reviews[i]._user === vm.user._id)) {
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
                        return vm.restaurant.reviews;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                )
                .then(
                    function (reviews) {
                        for (var i in reviews) {
                            UserService
                                .findUserById(reviews[i]._user)
                                .then(
                                    function (response) {
                                        var user = response.data;
                                        for (var i in reviews) {
                                            if (user._id === reviews[i]._user) {
                                                var review = reviews[i];
                                                console.log(review);
                                                break;
                                            }
                                        }
                                        review.user = user;
                                    }
                                )
                        }
                    }
                )
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
            if (rate) {
                var starId = id + " star-" + Math.ceil(rate);
                document.getElementById(starId).checked = true;
            }
        }
    }

    function RestaurantSearchController(RestaurantService, $location) {
        var vm = this;

        vm.search = search;
        vm.restaurants = [];
        vm.searchRestaurant = searchRestaurant;
        function searchRestaurant(keyword) {
            if (!keyword) {
            } else {
                $location.url("/search/" + keyword);
            }
        }

        function search(term) {
            RestaurantService
                .findRestaurantsByTerm(term)
                .then(
                )
        }
    }

    function RestaurantListController(RestaurantService, $location) {
        var vm = this;
        
        vm.getMore = getMore;
        vm.searchRestaurant = searchRestaurant;
        function searchRestaurant(keyword) {
            if (!keyword) {
            } else {
                $location.url("/search/" + keyword);
            }
        }

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