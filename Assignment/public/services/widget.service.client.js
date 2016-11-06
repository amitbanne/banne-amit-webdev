(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService(){

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

        var api = {
            createWidget:createWidget,
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget
        };
        return api;

        function createWidget(pageId, widget){
            widget.pageId = pageId;
            var wid = new Date();
            widget._id = wid;
            widgets.push(widget);
            return widget;
        }

        function findWidgetsByPageId(pageId){
            var result = [];
            for(var w in widgets){
                var widget = widgets[w];
                if(widget.pageId == pageId)
                    result.push(widget);
            }
            return result;
        }

        function findWidgetById(widgetId){
            for(var w in widgets){
                var widget = widgets[w];
                if(widget._id == widgetId)
                    return widget;
            }
            return null;
        }

        function updateWidget(widgetId, widget){
            for(var w in widgets){
                if(widgets[w]._id == widgetId){
                        if(widget.widgetType == "HEADER"){
                            widgets[w].size = widget.size;
                            widgets[w].text = widget.text;
                        }else if(widget.widgetType == "IMAGE"){
                            widgets[w].width = widget.width;
                            widgets[w].url = widget.url;
                        }else if(widget.widgetType == "YOUTUBE"){
                            widgets[w].width = widget.width;
                            widgets[w].url = widget.url;
                        }else if(widget.widgetType == "HTML"){
                            widgets[w].text = widget.text;
                        }
                }
            }
        }

        function deleteWidget(widgetId){
            for(var w in widgets){
                if(widgets[w]._id == widgetId){
                    widgets.splice(widgets[w],1);
                }
        }
    }

}
})();