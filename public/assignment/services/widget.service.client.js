/**
 * Created by Siddarthan on 17-Oct-16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        return api;

        var api = {
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget
        };

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }
        
        function findWidgetsByPageId(pageId) {
            for(var wd in widgets){
                widget = widgets[wd];
                if(widget.pageId === pageId){
                    return widget;
                }
            }
            return null;
        }
        
        function findWidgetById(widgetId) {
            for(var wd in widgets){
                widget = widgets[wd];
                if(widget._id === widgetId){
                    return widget;
                }
            }
            return null;
        }
        
        function updateWidget(widgetId, widget) {
            for(var wd in widgets) {
                localWidget = widgets[wd];
                if (localWidget._id === widgetId) {
                    widgets[wd] = widget;
                    break;
                }
            }
        }
        
        function deleteWidget(widgetId) {
            for(var wd in widgets){
                widget = widgets[wd];
                if(widget._id === widgetId){
                    widgets.splice(wd, 1);
                    break;
                }
            }
        }
    }
})();