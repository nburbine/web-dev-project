(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" }
        ];

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
                _id: (new Date().getTime()).toString(),
                widgetType: widget.widgetType,
                pageId: pageId
            };
            switch(newWidget.widgetType) {
                case "HEADER":
                    newWidget.size = widget.size;
                    newWidget.text = widget.text;
                    break;
                case "IMAGE":
                    newWidget.width = widget.width;
                    newWidget.url = widget.url;
                    break;
                case "HTML":
                    newWidget.text = widget.text;
                    break;
                case "YOUTUBE":
                    newWidget.width = widget.width;
                    newWidget.url = widget.url;
                    break;
                default:
                    vm.alert = "No widget type"
            }
        }
        
        function updateWidget(widgetId, widget) {
            var oldWidget = findWidgetById(widgetId);
            if (oldWidget) {
                oldWidget.name = widget.name;
                oldWidget.size = widget.size;
                oldWidget.text = widget.text;
                oldWidget.width = widget.width;
                oldWidget.url = widget.url;
                return true;
            } else {
                return false;
            }
        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            if (widget) {
                widgets.splice(widgets.indexOf(widget), 1);
                return true;
            } else {
                return false;
            }
        }

        function findWidgetsByPageId(pageId) {
            var matchingWidgets = [];
            for (var i in widgets) {
                if (widgets[i].pageId === pageId) {
                    matchingWidgets.push(widgets[i]);
                }
            }
            return matchingWidgets;
        }

        function findWidgetById(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    return widgets[i];
                }
            }
            return null;
        }
    }
})();