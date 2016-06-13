module.exports = function () {

    var WidgetSchema = require("./widget.schema.server.js")();
    var mongoose = require("mongoose");
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;
    
    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }
    
    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
    
    function updateWidget(widgetId, widget) {
        switch(widget.type) {
            case "HEADER":
                return Widget.update(
                    {_id: widgetId},
                    {$set:
                    {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size
                    }}
                );
                break;
            case "IMAGE":
                return Widget.update(
                    {_id: widgetId},
                    {$set:
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width
                    }}
                );
                break;
            case "HTML":
                return Widget.update(
                    {_id: widgetId},
                    {$set:
                    {
                        name: widget.name,
                        text: widget.text
                    }}
                );
                break;
            case "YOUTUBE":
                return Widget.update(
                    {_id: widgetId},
                    {$set:
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                        height: widget.height
                    }}
                );
                break;
            default:
                console.log()
        }
        
        
        
    }
    
    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }
    
    function findWidgetById(widgetId) {
        return Widget.findOne({_id: widgetId});
    }
    
    function reorderWidget(pageId, start, end) {
        return Widget.update(
            {_id: widgetId},
            {$set:
                {
                    // TODO
                }}
        )
    }
};