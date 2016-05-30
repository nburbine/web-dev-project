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
    
    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;

        vm.addWebsite = addWebsite;

        vm.userId = $routeParams['id'];
        vm.website = {
            name: "",
            description: ""
        };

        function addWebsite() {
            if (vm.website.name.length === 0) {
                vm.alert = "Please enter website name";
            } else {
                var result = WebsiteService.createWebsite(vm.userId, vm.website);
                if (result) {
                    window.location = '#/user/' + vm.userId.toString() + '/website';
                } else {
                    vm.alert = "Failed to create new website";
                }
            }
        }
    }
    
    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;

        vm.editWebsite = editWebsite;
        vm.deleteWebsite = deleteWebsite;
        
        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];
        vm.website = angular.copy(WebsiteService.findWebsiteById(vm.websiteId));
    
        function editWebsite() {
            if (vm.website.name.length === 0) {
                vm.alert = 'Website must have a name';
            } else {
                var result = WebsiteService.updateWebsite(vm.websiteId, vm.website);
                if (result) {
                    window.location = '#/user/' + vm.userId.toString() + '/website';
                } else {
                    vm.alert = 'Failed to update website';
                }
            }
        }
        
        function deleteWebsite() {
            var result = WebsiteService.deleteWebsite(vm.websiteId);
            if (result) {
                window.location = '#/user/'+vm.userId.toString()+'/website';
            } else {
                vm.alert = 'Failed to delete website';
            }
        }
    }
})();