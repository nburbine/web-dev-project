(function () {
    angular
        .module("RestaurantApp")
        .controller("FriendController", FriendController);

    function FriendController($routeParams, UserService,FriendService) {
        var vm = this;
        vm.id = $routeParams["id"];
        vm.addFriendByEmail=addFriendByEmail;
        function init() {
            UserService
                .findUserById(vm.id)
                .then(function (response) {
                    vm.user = response.data;
                });
        }

        init();

        function addFriendByEmail() {
            console.log(vm.email);
            FriendService
                .AddFriendByEmail(vm.id,vm.email)
                .then(
                    function (response) {
                        console.log(response+"succ");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function deleteFriend() {
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