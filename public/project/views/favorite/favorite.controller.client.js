(function () {
    angular
        .module("RestaurantApp")
        .controller("FavoriteController", FavoriteController);

    function FavoriteController($routeParams, UserService, FavoriteService, FriendService) {
        var vm = this;
        vm.id = $routeParams["id"];
        vm.lid = $routeParams["lid"];
        vm.updateList = updateList;
        vm.shareListToFriend = shareListToFriend;
        vm.searchRestaurant = searchRestaurant;
        vm.removeRestaurantFromList = removeRestaurantFromList;
        vm.restaurants = [{
            _id: "123",
            name: "233",
            type: 'seafood',

        }];
        function searchRestaurant(keyword) {
            if (!keyword) {
            } else {
                $location.url("/search/" + keyword);
            }
        }
        function init() {
            UserService
                .findUserById(vm.id)
                .then(function (response) {
                    vm.user = response.data;
                })
                .then(function (response) {
                        FriendService
                            .getFriends(vm.user.friends)
                            .then(function (response) {
                                vm.friends = response.data;
                            })
                    }
                );
            FavoriteService
                .findListById(vm.lid)
                .then(function (response) {
                    vm.list = response.data;
                });
        }

        init();


        function FriendAlready(friends, fid) {
            for (i in friends) {
                if (friends[i] == fid) {
                    return true;

                }
            }
            return false;
        }

        function updateList() {
            vm.success = null;
            vm.error = null;
            FavoriteService
                .updateList(vm.list)
                .then(
                    function (response) {
                        vm.success = "List info successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }

        function listAlready(friends, fid) {
            for (i in friends) {
                if (friends[i] == fid) {
                    return true;
                }
            }
            return false;
        }

        function shareListToFriend(fid) {
            vm.success = null;
            vm.error = null;
            if (listAlready(vm.list._users, fid)) {
                vm.error = "This friend has this list already";
            }
            else {
                FavoriteService
                    .addListForUser(fid, vm.list._id)
                    .then(
                        function (response) {
                            vm.success = "send shared list successfully";
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        function removeRestaurantFromList(rid) {
            FavoriteService
                .removeRestaurantFromList(vm.lid, rid)
                .then(
                    function (response) {
                        FavoriteService
                            .findListById(vm.lid)
                            .then(function (response) {
                                vm.list = response.data;
                            });
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )

        }
    }

})();