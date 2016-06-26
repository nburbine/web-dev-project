(function () {
    angular
        .module("RestaurantApp")
        .controller("SearchController", SearchController)

    function SearchController($scope, $routeParams, RestaurantService) {
        var vm = this;
        vm.keyword = $routeParams["keyword"];
        console.log(vm.keyword);


        $scope.sortColumn = "name";
        $scope.reverseSort = false;

        $scope.sortData = function (column) {
            $scope.reverseSort = ($scope.sortColumn == column) ?
                !$scope.reverseSort : false;
            $scope.sortColumn = column;
        };

        $scope.getSortClass = function (column) {

            if ($scope.sortColumn == column) {
                return $scope.reverseSort
                    ? 'arrow-down'
                    : 'arrow-up';
            }

            return '';
        };


        function init() {
            RestaurantService
                .searchRestaurant(vm.keyword)
                .then(function (response) {
                    vm.restaurants = response.data;
                    console.log(vm.restaurants);
                });
            //.then(function (response) {
            //        FriendService
            //            .getFriends(vm.user.friends)
            //            .then(function (response) {
            //                vm.friends = response.data;
            //            })
            //    }
            //)
        }

        init();
    }
})();