/**
 * Created by Siddarthan on 15-Nov-16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget : createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        findWidgetById : findWidgetById,
        updateWidget : updateWidget,
        deleteWidget : deleteWidget,
        reorderWidget : reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {

    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({
            _page : pageId
        })
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {

    }

    function deleteWidget(widgetId) {
        return WidgetModel
            .remove(
                {
                    _id : widgetId
                });
    }

    function reorderWidget(pageId, start, end) {

    }
}