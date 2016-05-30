(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    
    function PageListController($routeParams, PageService) {
        var vm = this;
        
        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];
        
        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();

        console.log(vm.pages);
    }
    
    function NewPageController($routeParams, PageService) {
        var vm = this;
    }
    
    function EditPageController($routeParams, PageService) {
        var vm = this;
    }
})();