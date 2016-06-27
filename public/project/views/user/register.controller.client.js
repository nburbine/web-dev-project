(function () {
    angular
        .module("RestaurantApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;

        vm.register = register;
        vm.searchRestaurant = searchRestaurant;
        function register() {
            if (vm.user.username == null) {
                vm.error = "Please enter username and password";
            }
            else if (vm.user.password != vm.user.password2) {

                vm.error = "Verified password incorrect";
            }
            else {
                UserService
                    .register(vm.user)
                    .then(
                        function (response) {
                            var user = response.data;
                            $location.url("/user/" + user._id);
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        function searchRestaurant(keyword) {
            if (!keyword) {

            } else {
                $location.url("/search/" + keyword);
            }
        }
    }
})();