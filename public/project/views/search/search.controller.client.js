(function () {
    angular
        .module("RestaurantApp")
        .controller("SearchController", SearchController)

    function SearchController($location, $scope, $routeParams, RestaurantService, ReviewService, UserService) {
        var vm = this;
        vm.keyword = $routeParams["keyword"];
        vm.searchRestaurant = searchRestaurant;
        function searchRestaurant(keyword) {
            if (!keyword) {
            } else {
                $location.url("/search/" + keyword);
            }
        }


        $scope.sortColumn = "name";
        $scope.reverseSort = false;

        $scope.sortData = function (column) {
            $scope.reverseSort = ($scope.sortColumn == column) ?
                !$scope.reverseSort : false;
            $scope.sortColumn = column;
        };

        $scope.getSortClass = function (column) {

            if ($scope.sortColumn == column) {
                return $scope.reverseSort
                    ? 'arrow-down'
                    : 'arrow-up';
            }

            return '';
        };


        function init() {
            UserService
                .checkLoggedin()
                .then(
                    function (response) {
                        if (!(response.data === "0")) {
                            vm.user = response.data;
                            console.log(vm.user);
                            if (vm.user._id === vm.profileId) {
                                vm.currentUser = true;
                            }
                        }
                    }
                );

            var doneRestaurants = 0;
            RestaurantService
                .searchRestaurant(vm.keyword)
                .then(function (response) {
                        numRestaurants = response.data.length;
                        return restaurants = response.data;
                    },
                    function (error) {
                        vm.alert = error.data;
                        console.log(error);
                    })
                .then(function (restaurants) {
                        for (var i in restaurants) {
                            var restaurantIdx = 0;
                            ReviewService
                                .findAllReviewsForRestaurant(restaurants[i]._id)
                                .then(
                                    function (response) {
                                        var reviews = response.data;
                                        var restaurant = restaurants[restaurantIdx];
                                        restaurant.numReviews = reviews.length;
                                        restaurantIdx += 1;
                                        if (restaurant.numReviews === 0) {
                                            restaurant.rating = 'No reviews';
                                            return restaurant;
                                        } else {
                                            var sum = 0;
                                            for (var i in reviews) {
                                                sum += reviews[i].rate;
                                            }
                                            var averageRating = sum / restaurant.numReviews;
                                            restaurant.rating = averageRating;
                                            return restaurant;
                                        }
                                    },
                                    function (error) {
                                        vm.alert = error.data;
                                    }
                                )
                                .then(
                                    function (restaurant) {
                                        doneRestaurants += 1;
                                        if (restaurants.length === doneRestaurants) {
                                            vm.restaurants = restaurants;
                                            console.log(vm.restaurants);
                                        }
                                    }
                                )
                        }
                    }
                );
        }
        init();
    }
})();