(function () {
    angular
        .module("RestaurantApp")
        .controller("SearchController", SearchController)

    function SearchController($location, $scope, $routeParams, RestaurantService, ReviewService) {
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
                                        var restaurant = restaurants[restaurantIdx];
                                        restaurantIdx += 1;
                                        var reviews = response.data;
                                        var sum = 0;
                                        var numReviews = reviews.length;
                                        for (var i in reviews) {
                                            sum += reviews[i].rate;
                                        }
                                        var averageRating = sum / numReviews;
                                        restaurant.rating = averageRating;
                                        return restaurant;
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