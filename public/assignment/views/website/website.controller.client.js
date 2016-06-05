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
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(
                    function (response) {
                        vm.websites = response.data;
                    },
                    function (error) {
                        vm.alert = error.body;
                    }
                );
        }
        init();
    }
    
    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;

        vm.addWebsite = addWebsite;

        vm.userId = $routeParams['id'];
        vm.website = {
            name: "",
            description: "",
            developerId: vm.userId
        };

        function addWebsite() {
            if (vm.website.name.length === 0) {
                vm.alert = "Please enter website name";
            } else {
                WebsiteService
                    .createWebsite(vm.userId, vm.website)
                    .then(
                        function (response) {
                            console.log(response);
                            window.location = '#/user/' + vm.userId.toString() + '/website';
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    );
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
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(
                    function (response) {
                        window.location = '#/user/'+vm.userId.toString()+'/website';
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
        }
    }
})();