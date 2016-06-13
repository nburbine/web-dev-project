(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);
    
    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        
        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;

        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        
        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (response) {
                        vm.widgets = response.data;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
        }
        init();
        
        function getTrustedHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function getTrustedUrl(text) {
            var urlParts = text.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
        
        $(".widget-container").sortable({
            axis: "y"
        });
    }

    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;

        vm.addWidget = addWidget;

        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        
        function addWidget(type) {
            var newWidget = {
                pageId: vm.pageId,
                text: 'Lorem Ipsum'
            };
            switch (type) {
                case 'HEADER':
                    newWidget.type = 'HEADER';
                    newWidget.size = 1;
                    break;
                case 'IMAGE':
                    newWidget.type = 'IMAGE';
                    newWidget.width = '95%';
                    newWidget.url = 'http://lorempixel.com/400/200/';
                    break;
                case 'YOUTUBE':
                    newWidget.type = 'YOUTUBE';
                    newWidget.width = '95%';
                    newWidget.url = 'https://youtu.be/dQw4w9WgXcQ';
                    break;
                default:
                    vm.alert("Invalid widget type");
            }
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .then(
                    function (response) {
                        var id = response.data._id;
                        window.location = '#/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+id;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                )
        }
    }

    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;

        vm.deleteWidget = deleteWidget;
        vm.editWidget = editWidget;

        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        WidgetService
            .findWidgetById(vm.widgetId)
            .then(function (response) {
                console.log(response);
                vm.widget = response.data;
            });

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(
                    function (response) {
                        window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page/' + vm.pageId.toString() + '/widget/';
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
        }

        function editWidget() {
            var push = function () {
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(
                    function (response) {
                        window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page/' + vm.pageId.toString() + '/widget/';
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                );
            };

            switch (vm.widget.type) {
                case "HEADER":
                    if (vm.widget.text.length === 0) {
                        vm.alert = 'Please enter text';
                    } else {
                        push();
                    }
                    break;
                case "IMAGE":
                    if (vm.widget.url.length === 0) {
                        vm.alert = 'Please enter URL';
                    } else {
                        push();
                    }
                    break;
                case "HTML":
                    if (vm.widget.text.length === 0) {
                        vm.alert = 'Please enter text';
                    } else {
                        push();
                    }
                    break;
                case "YOUTUBE":
                    if (vm.widget.url.length === 0) {
                        vm.alert = 'Please enter URL';
                    } else {
                        push();
                    }
                    break;
                default:
                    vm.alert = "No widget type"
            }
        }
    }
})();