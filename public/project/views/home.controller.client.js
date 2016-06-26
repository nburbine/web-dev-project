(function () {
    angular
        .module("RestaurantApp")
        .controller("HomeController", HomeController);

    function HomeController($location, UserService, RestaurantService, ReviewService) {
        var vm = this;
        
        vm.populateStars = populateStars;
        vm.searchRestaurant = searchRestaurant;
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
            
            var doneRestaurants = 0;
            RestaurantService
                .findAllRestaurants()
                .then(
                    function (response) {
                        numRestaurants = response.data.length;
                        return restaurants = response.data;
                    },
                    function (error) {
                        vm.alert = error.data;
                        console.log(error);
                    }
                )
                .then(
                    function (restaurants) {
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
                                        if(restaurants.length === doneRestaurants) {
                                            vm.restaurants = restaurants.slice(0,3);
                                        }
                                    }
                                )
                        }
                    }
                )

        }
        init();

        function populateStars(id, rate) {
            if (rate) {
                var starId = id + " star-" + Math.ceil(rate);
                document.getElementById(starId).checked = true;
            }
        }

        function searchRestaurant(keyword) {
            $location.url("/search/" + keyword);
        }
    }
})();