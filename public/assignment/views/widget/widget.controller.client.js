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
                        console.log(response);
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
                text: '',
                url: ""
            };
            var result = WidgetService.createWidget(vm.pageId, newWidget);
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
                text: '',
                url: ""
            };
            var result = WidgetService.createWidget(vm.pageId, newWidget);
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
            var result = WidgetService.deleteWidget(vm.widgetId);
            if (result) {
                window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page/' + vm.pageId.toString() + '/widget/';
                initEditWidget();
            } else {
                vm.alert = 'Failed to delete widget';
            }
        }

        function editWidget() {
            var push = function () {
                console.log('b');
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(
                    function (response) {
                        console.log(response);
                        window.location = '#/user/' + vm.userId.toString() + '/website/' + vm.websiteId.toString() + '/page/' + vm.pageId.toString() + '/widget/';
                    },
                    function (error) {
                        vm.alert = error.data;
                        console.log(vm.alert);
                    }
                );
            };

            switch (vm.widget.widgetType) {
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
                    console.log('a');
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