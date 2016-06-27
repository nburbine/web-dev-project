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
                        if (numRestaurants === 0) {
                            initializeData();
                        }
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
                            ReviewService
                                .findAllReviewsForRestaurant(restaurants[i]._id)
                                .then(
                                    function (response) {
                                        var reviews = response.data;
                                        if (reviews.length) {
                                            for (var i in restaurants) {
                                                if (restaurants[i]._id === reviews[0]._restaurant) {
                                                    var restaurant = restaurants[i];
                                                    break;
                                                }
                                            }
                                            var sum = 0;
                                            var numReviews = reviews.length;
                                            for (var i in reviews) {
                                                sum += reviews[i].rate;
                                            }
                                            var averageRating = sum / numReviews;
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
        
        function initializeData() {
            var restaurants = [
                {
                    name: "Andy's",
                    description: "Good seafood",
                    type: "Seafood",
                    address: "7 Yawkey Way",
                    url: "photo/andy.jpg",
                    menu: [
                        {
                            description: "Deep fried fish",
                            foodName: "Fried Cod",
                            url: ""
                        },
                        {
                            description: "Delicious hickory-smoked salmon",
                            foodName: "Smoked Salmon",
                            url: ""
                        },
                        {
                            description: "Grilled swordfish steak",
                            foodName: "Grilled Swordfish",
                            url: ""
                        }
                    ]
                },
                {
                    name: "The Rusty Tire",
                    description: "Standard pub fare",
                    type: "Pub",
                    address: "3 Huntington Avenue",
                    url: "photo/bar.jpg",
                    menu: [
                        {
                            description: "A dozen spicy wings",
                            foodName: "Buffalo Wings",
                            url: ""
                        },
                        {
                            description: "20 oz. angus burger with all the toppings",
                            foodName: "Cheeseburger",
                            url: ""
                        }
                    ]
                },
                {
                    name: "Ambrosia",
                    description: "Chic sushi",
                    type: "Sushi",
                    address: "800 Tremont Avenue",
                    url: "photo/sushi.jpg",
                    menu: [
                        {
                            description: "6 tuna rolls",
                            foodName: "Tuna Maki",
                            url: ""
                        },
                        {
                            description: "6 spicy salmon rolls",
                            foodName: "Spicy Salmon Roll",
                            url: ""
                        },
                        {
                            description: "Delicious soup made from scratch",
                            foodName: "Miso Soup",
                            url: ""
                        }
                    ]
                }
            ];
            for (var i in restaurants) {
                RestaurantService
                    .createRestaurant(restaurants[i])
                    .then(
                        function (res) {
                            console.log(res.data);
                        },
                        function (error) {
                            console.log(error.data);
                        }
                    )
            }
        }

        function populateStars(id, rate) {
            if (rate) {
                var starId = id + " star-" + Math.ceil(rate);
                document.getElementById(starId).checked = true;
            }
        }

        function searchRestaurant(keyword) {
            if (!keyword) {

            } else {
            $location.url("/search/" + keyword);
            }
        }
    }
})();