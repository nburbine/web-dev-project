(function () {
    angular
        .module("RestaurantApp")
        .controller("FriendController", FriendController);

    function FriendController($routeParams, FriendService) {
        var vm = this;
        vm.id = $routeParams["id"];

        function init() {

        }

        init();

        function addFriend() {
            console.log('adding');
            FriendService
                .addFriendByEmail(restaurant)
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

})();