(function () {
    angular
        .module("RestaurantApp")
        .controller("HomeController", HomeController)
    
    function HomeController($routeParams, RestaurantService) {
        var vm = this;
        
        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];
        
        function init() {
            RestaurantService
                .findPagesByWebsiteId(vm.websiteId)
                .then(
                    function (response) {
                        vm.pages = response.data;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                )
        }
        init();
    }
    


})();