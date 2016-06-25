(function () {
    angular
        .module("RestaurantApp")
        .controller("FriendController", FriendController);

    function FriendController($routeParams, UserService,FriendService) {
        var vm = this;
        vm.id = $routeParams["id"];
        vm.addFriendByEmail=addFriendByEmail;
        vm.deleteFriend = deleteFriend;
        vm.friend = null;
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
                )
        }

        init();

        function addFriendByEmail() {
            FriendService
                .findUserByEmail(vm.email)
                .then(
                    function (response) {
                        vm.friend = response.data;
                        if (vm.user.email == vm.friend.email) {
                            vm.error = "you cannot add your self";
                        }
                        else if (FriendAlready(vm.user.friends, vm.friend._id)) {
                            vm.error = "you already have this friend";
                        }
                        else {
                            FriendService
                                .addFriendById(vm.id, vm.friend._id)
                                .then(
                                    function (response) {
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
                                            )
                                    },
                                    function (error) {
                                        vm.error = error.data;
                                    }
                                );
                        }
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }

        function FriendAlready(friends, fid) {
            for (i in friends) {
                if (friends[i] == fid) {
                    return true;

                }
            }
            return false;
        }


        function deleteFriend(fid) {
            FriendService
                .deleteFriend(vm.id, fid)
                .then(
                    function (response) {
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
                            )
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }
    }

})();