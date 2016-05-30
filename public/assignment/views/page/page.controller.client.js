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
    }
    
    function NewPageController($routeParams, PageService) {
        var vm = this;

        vm.addPage = addPage;

        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['id'];

        vm.page = {
            name: "",
            title: ""
        };

        function addPage() {
            if (vm.page.name.length === 0) {
                vm.alert = 'Page must have a name';
            } else {
                var result = PageService.createPage(vm.websiteId, vm.page);
                if (result) {
                    window.location = '#/user/'+vm.userId.toString()+'/website/'+vm.websiteId.toString()+'/page';
                } else {
                    vm.alert = 'Failed to create page';
                }
            }
        }
    }
    
    function EditPageController($routeParams, PageService) {
        var vm = this;
    }
})();