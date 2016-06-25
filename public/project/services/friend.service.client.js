(function () {
    angular
        .module("RestaurantApp")
        .factory("FriendService", FriendService);

    function FriendService($http) {
        var api = {
            AddFriendByEmail: AddFriendByEmail,
            findFriendsByUserId: findFriendsByUserId,
            deleteFriend:deleteFriend
        };
        return api;
        function findFriendsByUserId(uid) {
            var url = "/projectApi/user/" + uid + "/friend";
            return $http.get(url);
        }

        function AddFriendByEmail(uid, email) {
            var url = "/projectApi/user/" + uid + "/friend/"+email;
            return $http.post(url);
        }
        function deleteFriend(uid,friendId) {
            var url = "/projectApi/user/" + uid + "/friend/"+friendId;
            return $http.delete(url);
        }


    }
})();