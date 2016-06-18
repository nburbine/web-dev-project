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
            PageService
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
    
    function NewPageController($routeParams, PageService) {
        var vm = this;

        vm.addPage = addPage;

        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];

        vm.page = {
            name: "",
            title: "",
            websiteId: vm.websiteId
        };

        function addPage() {
            if (vm.page.name.length === 0) {
                vm.alert = 'Page must have a name';
            } else {
                PageService
                    .createPage(vm.websiteId, vm.page)
                    .then(
                        function (response) {
                            window.location = '#/user/'+vm.userId.toString()+'/website/'+vm.websiteId.toString()+'/page';
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    );
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

        PageService
            .findPageById(vm.pageId)
            .then(function (response) {
                vm.page = response.data;
            });
        
        function editPage() {
            if (vm.page.name.length === 0 ) {
                vm.alert = "Page must have a name";
            } else {
                PageService
                    .updatePage(vm.pageId, vm.page)
                    .then(
                        function (response) {
                            window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page';
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    );
            }
        }
        
        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(
                    function (response) {
                        window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page';
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
        }
    }
})();