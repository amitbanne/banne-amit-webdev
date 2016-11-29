module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        setModel: setModel,
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    }
    return api;

    function setModel(_model) {
        model = _model;
    }
    
    function createWidget(pageId, widget) {
        widget.dateCreated = new Date();
        widget._page = pageId;
        return WidgetModel
            .create(widget)
            .then(function (widgetObj) {
                return widgetObj;
            });
    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId);
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {

        if(widget.type == 'HEADER'){
           /* widgets[w].size = widget.size;
            widgets[w].text = widget.text;*/

            return WidgetModel
                .update({_id: widgetId},
                    {
                        size: widget.size,
                        text: widget.text,

                    });

        }else if(widget.type == 'IMAGE'){
            /*widgets[w].width = widget.width;
            widgets[w].url = widget.url;*/

            return WidgetModel
                .update({_id: widgetId},
                    {
                        width: widget.width,
                        url: widget.url,
                    });

        }else if(widget.type == 'YOUTUBE'){
            /*widgets[w].width = widget.width;
            widgets[w].url = widget.url;*/

            return WidgetModel
                .update({_id: widgetId},
                    {
                        width: widget.width,
                        url: widget.url,
                    });

        }else if(widget.type == 'HTML'){
            // widgets[w].text = widget.text;

            return WidgetModel
                .update({_id: widgetId},
                    {
                        text: widget.text,
                    });
        }else if(widget.type == 'TEXT'){
            // widgets[w].text = widget.text;

            return WidgetModel
                .update({_id: widgetId},
                    {
                        text: widget.text,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted
                    });
        }


    }

    function deleteWidget(widgetId) {
        console.log("delete widget model: "+ widgetId);
        return WidgetModel.findById(widgetId)
            .then(function (widgetObj) {
                var pageId = widgetObj._page;
                console.log("here 1");
                return WidgetModel.remove({_id: widgetId})
                    .then(function (res) {
                        console.log("here 2");
                        return model.pageModel.deleteWidgetForPage(pageId, widgetId)
                            .then(function (pageObj) {
                                console.log("here 3");
                            });
                    });
            });

    }
    
    function reorderWidget(pageId, start, end) {
        console.log("Inside widget model sort: "+ pageId);
        return model.pageModel.reorderWidgetForPage(pageId, start, end);
    }

}