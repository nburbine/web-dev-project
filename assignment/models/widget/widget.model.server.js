module.exports = function () {

    var WidgetSchema = require("./widget.schema.server.js");
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
        return Widget.update(
            {_id: widgetId},
            {$set:
                {
                    name: widget.name,
                    text: widget.text,
                    placeholder: widget.placeholder,
                    description: widget.description,
                    url: widget.url,
                    width: widget.width,
                    height: widget.height,
                    rows: widget.rows,
                    size: widget.size,
                    class: widget.class,
                    icon: widget.icon,
                    deletable: widget.deletable,
                    formatted: widget.formatted
                }}
        );
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