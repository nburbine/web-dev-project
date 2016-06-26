(function () {
    angular
        .module("RestaurantApp")
        .controller("SearchController", SearchController)

    function SearchController($scope, $routeParams, RestaurantService) {
        var vm = this;

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

        }

        init();
    }


})();