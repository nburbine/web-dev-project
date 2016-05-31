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
        vm.websiteId = $routeParams['wid'];

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

        vm.editPage = editPage;
        vm.deletePage = deletePage;

        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.page = angular.copy(PageService.findPageById(vm.pageId));
        
        function editPage() {
            if (vm.page.name.length === 0 ) {
                vm.alert = "Page must have a name";
            } else {
                var result = PageService.updatePage(vm.pageId, vm.page);
                if (result) {
                    window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page';
                } else {
                    vm.alert = 'Failed to update Page';
                }
            }
        }
        
        function deletePage() {
            var result = PageService.deletePage(vm.pageId);
            if (result) {
                window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page';
            } else {
                vm.alert = 'Failed to delete page';
            }
        }
    }
})();