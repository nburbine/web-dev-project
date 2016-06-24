(function () {
    angular
        .module("RestaurantApp")
        .controller("RestaurantController", RestaurantController)
        .controller("RestaurantSearchController", RestaurantSearchController);
    
    // var restaurants = [
    //     {
    //         id: 0,
    //         name: "Andy's",
    //         menu: [
    //             {
    //                 name: 'Shrimp',
    //                 description: 'Tasty'
    //             },
    //             {
    //                 name: 'Fish',
    //                 description: 'Not as tasty'
    //             }
    //         ],
    //         ratings: [5, 4, 3, 4, 5],
    //         reviews: ['Good', 'Okay', 'Bad'],
    //         type: 'Seafood'
    //     }
    // ];
    
    function RestaurantController($routeParams, RestaurantService) {
        var vm = this;

        vm.restaurantId = $routeParams['rid'];
        
        vm.user = {
            rating: 4,
            review: "Bueno"
        };

        function init() {
            RestaurantService
                .findRestaurantById(vm.restaurantId)
                .then(
                    function (response) {
                        vm.restaurant = response.data;
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
})();