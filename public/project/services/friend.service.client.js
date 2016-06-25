(function () {
    angular
        .module("RestaurantApp")
        .factory("FriendService", FriendService);

    function FriendService($http) {
        var api = {
            addFriendById: addFriendById,
            findFriendsByUserId: findFriendsByUserId,
            deleteFriend: deleteFriend,
            findUserByEmail: findUserByEmail,
            getFriends: getFriends
        };
        return api;

        function getFriends(friends) {
            var url = "/projectApi/friends";
            return $http.post(url, friends);
        }

        function findFriendsByUserId(uid) {
            var url = "/projectApi/user/" + uid + "/friend";
            return $http.get(url);
        }

        function addFriendById(uid, fid) {
            var url = "/projectApi/user/" + uid + "/friend/" + fid;
            return $http.post(url);
        }
        function deleteFriend(uid,friendId) {
            var url = "/projectApi/user/" + uid + "/friend/"+friendId;
            return $http.delete(url);
        }

        function findUserByEmail(email) {
            var url = "/projectApi/email/" + email;
            return $http.get(url);
        }

    }
})();