(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, $routeParams, WidgetService) {
        var vm = this;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        vm.userId = $routeParams['id'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        WidgetService
            .findWidgetById(vm.widgetId)
            .then(
                function (response) {
                    vm.widget = response.data;
                },
                function (error) {
                    vm.alert = response.data;
                }
            );

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function (response) {
                        data = response.data.replace('jsonFlickrApi(',"");
                        data = data.substring(0,data.length-1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function (error) {
                        vm.alert = error.data;
                    }
                )
        }

        function selectPhoto(photo) {
            var url = 'https://farmFARM.staticflickr.com/SERVER/ID_SECRET.jpg';
            url = url
                .replace('FARM', photo.farm)
                .replace('SERVER', photo.server)
                .replace('ID', photo.id)
                .replace('SECRET', photo.secret);
            vm.widget.url = url;
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .then(
                    function (response) {
                        window.location = '#/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/' + vm.widgetId  ;
                    }
                )
        }
    }
})();