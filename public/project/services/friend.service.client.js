(function () {
    angular
        .module("RestaurantApp")
        .factory("FriendService", FriendService);

    function FriendService($http) {
        var api = {
            addFriendByEmail: addFriendByEmail,
            findFriendsByUserId: findFriendsByUserId

        };
        return api;
        function findFriendsByUserId(_user) {
            var url = "/projectApi/user/" + userId + "/friend";
            return $http.get(url);
        }

        function addFriendByEmail(_user, email) {
            var url = "/projectApi/friend";
            return $http.post(_user, email);
        }

        function updateRestaurant(restaurantId, restaurant) {
            var url = "/projectApi/restaurant/" + restaurantId;
            return $http.put(url, restaurant);
        }

        function deleteRestaurant(restaurantId) {
            var url = "/projectApi/restaurant/" + restaurantId;
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
    }
})();