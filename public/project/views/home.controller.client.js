(function () {
    angular
        .module("RestaurantApp")
        .controller("HomeController", HomeController);
    
    function HomeController($routeParams, RestaurantService) {
        var vm = this;
        // var restaurants = [{
        //     restaurantsname: "foodhouse1",
        //     discription: "place3Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See t"
        // },
        //     {
        //         restaurantsname: "foodhouse2",
        //         discription: "good place3Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See the detailed description on Franz Josef restaurant or the Café-bar for ..."
        //     },
        //     {
        //         restaurantsname: "foodhouse2",
        //         discription: "good place3 Our luxury Franz Josef restaurant offers not only keenly price lunch menu but also a ... See the detailed description on Franz Josef restaurant or the Café-bar for ..."
        //     }];
        
        function init() {
            RestaurantService
                .findAllRestaurants()
                .then(
                    function (response) {
                        var restaurants = response.data;
                        console.log(restaurants);
                        vm.restaurants = restaurants.slice(0,3);
                        console.log(vm.restaurants);
                    },
                    function (error) {
                        vm.alert = error.data;
                        console.log(error);
                    }
                )
        }
        init();
    }
    


})();