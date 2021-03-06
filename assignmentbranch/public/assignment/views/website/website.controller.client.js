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

        WebsiteService
            .findWebsiteById(vm.websiteId)
            .then(function (response) {
                vm.website = response.data;
            });
    
        function editWebsite() {
            if (vm.website.name.length === 0) {
                vm.alert = 'Please enter website name';
            } else {
                WebsiteService
                    .updateWebsite(vm.websiteId, vm.website)
                    .then(
                        function (response) {
                            window.location = '#/user/' + vm.userId.toString() + '/website';
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    )
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