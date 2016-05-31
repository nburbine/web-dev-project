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
            vm.widgets = angular.copy(WidgetService.findWidgetsByPageId(vm.pageId));
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
    }

    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;

        vm.addHeader = addHeader;
        vm.addImage = addImage;
        vm.addYoutube = addYoutube;

        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.types = [
            {name: "Header", addWidget: 'model.addHeader()'},
            {name: "Image", addWidget: 'model.addImage()'},
            {name: "YouTube", addWidget: 'model.addYoutube()'},
            {name: "HTML", addWidget: 'model.addHtml()'}
        ];

        function addHeader() {
            var newWidget = {
                widgetType: 'HEADER',
                size: 1,
                text: ''
            };
            var result = WidgetService.createWidget(vm.pageId, newWidget);
            console.log(result);
            if (result) {
                window.location = '#/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+result;
            } else {
                vm.alert = 'Failed to create new header widget'
            }
        }

        function addImage() {
            var newWidget = {
                widgetType: 'IMAGE',
                width: '',
                url: ""
            };
            var result = WidgetService.createWidget(vm.pageId, newWidget);
            console.log(result);
            if (result) {
                window.location = '#/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+result;
            } else {
                vm.alert = 'Failed to create new image widget'
            }
        }

        function addYoutube() {
            var newWidget = {
                widgetType: 'YOUTUBE',
                width: '',
                url: ""
            };
            var result = WidgetService.createWidget(vm.pageId, newWidget);
            console.log(result);
            if (result) {
                window.location = '#/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+result;
            } else {
                vm.alert = 'Failed to create new image widget'
            }
        }
    }

    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;

        vm.deleteWidget = deleteWidget;

        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.widget = angular.copy(WidgetService.findWidgetById(vm.widgetId));
        console.log(vm.widget);

        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.widgetId);
            if (result) {
                window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page/' + vm.pageId.toString() + '/widget/';
            } else {
                vm.alert = 'Failed to delete widget';
            }
        }

        switch(vm.widget.widgetType) {
            case "HEADER":
                vm.editWidget = function editWidget() {
                    console.log(vm.widget);
                    if (vm.widget.text.length === 0) {
                        vm.alert = 'Please enter text';
                    } else {
                        var result = WidgetService.updateWidget(vm.widgetId, vm.widget);
                        console.log(result);
                        if (result) {
                            window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page/' + vm.pageId.toString() + '/widget/';
                        } else {
                            vm.alert = 'Failed to update widget';
                        }
                    }
                };
                break;
            case "IMAGE":
                vm.editWidget = function editWidget() {
                    var result = WidgetService.updateWidget(vm.widgetId, vm.widget);
                    if (result) {
                        window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page/' + vm.pageId.toString() + '/widget/';
                    } else {
                        vm.alert = 'Failed to update widget';
                    }
                };
                break;
            case "HTML":
                vm.editWidget = function editWidget() {

                };
                break;
            case "YOUTUBE":
                vm.editWidget = function editWidget() {
                    var result = WidgetService.updateWidget(vm.widgetId, vm.widget);
                    if (result) {
                        window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page/' + vm.pageId.toString() + '/widget/';
                    } else {
                        vm.alert = 'Failed to update widget';
                    }
                };
                break;
            default:
                vm.alert = "No widget type"
        }
    }
})();