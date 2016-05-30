(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function WebsiteListController($routeParams ,WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['id'];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        console.log(vm.websites);
    }
    
    function NewWebsiteController() {
        
    }
    
    function EditWebsiteController() {
        
    }
})();