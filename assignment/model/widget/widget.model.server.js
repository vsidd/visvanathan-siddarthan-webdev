/**
 * Created by Siddarthan on 15-Nov-16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget : createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        findWidgetById : findWidgetById,
        updateWidget : updateWidget,
        deleteWidget : deleteWidget,
        reorderWidget : reorderWidget,
        setModel : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return WidgetModel
            .create(widget)
            .then(function (widgetObj) {
                model.pageModel
                    .findPageById(pageId)
                    .then(function (pageObj) {
                        pageObj.widgets.push(widgetObj);
                        pageObj.save();
                    });
                return widgetObj;
            });
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
        return WidgetModel
            .update(
                {
                    _id : widgetId
                },
                {
                    $set : widget
                }
            );
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