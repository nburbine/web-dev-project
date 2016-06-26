(function () {
    angular
        .module("RestaurantApp")
        .factory("FavoriteService", FavoriteService);

    function FavoriteService($http) {
        var api = {
            createList: createList,
            findAllListsForUser: findAllListsForUser,
            deleteListForUser: deleteListForUser,
            addListForUser: addListForUser,
            findListById: findListById,
            updateList: updateList
        };
        return api;

        function updateList(list) {
            var url = "/projectApi/list/";
            return $http.put(url, list);
        }
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

        function addListForUser(uid, lid) {
            var url = "/projectApi/user/" + uid + "/list/" + lid;
            return $http.put(url);
        }

        function findListById(lid) {
            var url = "/projectApi/list/" + lid;
            return $http.get(url);
        }
    }
})();