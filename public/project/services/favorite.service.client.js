(function () {
    angular
        .module("RestaurantApp")
        .factory("FavoriteService", FavoriteService);

    function FavoriteService($http) {
        var api = {
            createList: createList,
            findAllListsForUser: findAllListsForUser,
            deleteListForUser: deleteListForUser
        };
        return api;

        function createList(list) {
            var url = "/projectApi/list";
            return $http.post(url, list);
        }

        function findAllListsForUser(uid) {
            var url = "/projectApi/user/" + uid + "/list";
            return $http.get(url);
        }

        function deleteListForUser(uid, lid) {
            var url = "/projectApi/user/" + uid + "/list/" + lid;
            return $http.delete(url);
        }
    }
})();