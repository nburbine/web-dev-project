(function () {
    angular
        .module("RestaurantApp")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService($http) {
        var api = {
            createRestaurant: createRestaurant,
            updateRestaurant: updateRestaurant,
            deleteRestaurant: deleteRestaurant,
            findAllRestaurants: findAllRestaurants,
            findRestaurantById: findRestaurantById,
            searchRestaurant: searchRestaurant
        };
        return api;

        function createRestaurant(restaurant) {
            var url = "/projectApi/restaurant";
            return $http.post(url, restaurant);
        }

        function updateRestaurant(restaurantId, restaurant) {
            var url = "/projectApi/restaurant/"+restaurantId;
            return $http.put(url, restaurant);
        }

        function deleteRestaurant(restaurantId) {
            var url = "/projectApi/restaurant/"+restaurantId;
            return $http.delete(url);
        }

        function findAllRestaurants(websiteId) {
            var url = "/projectApi/restaurant";
            return $http.get(url);
        }

        function findRestaurantById(restaurantId) {
            var url = "/projectApi/restaurant/" + restaurantId;
            console.log(url);
            return $http.get(url);
        }

        function searchRestaurant(keyword) {
            var url = "/projectApi/search/" + keyword;
            return $http.get(url);
        }
    }
})();