(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById
        };
        return api;

        function createWidget(pageId, widget) {
            var newWidget = {
                widgetType: widget.widgetType,
                pageId: pageId,
                text: widget.text
            };
            switch(newWidget.widgetType) {
                case "HEADER":
                    newWidget.size = widget.size;
                    break;
                case "IMAGE":
                    newWidget.width = widget.width;
                    newWidget.url = widget.url;
                    break;
                case "HTML":
                    break;
                case "YOUTUBE":
                    newWidget.width = widget.width;
                    newWidget.url = widget.url;
                    break;
                default:
                    return false;
            }
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, newWidget);
        }
        
        function updateWidget(widgetId, widget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }
    }
})();