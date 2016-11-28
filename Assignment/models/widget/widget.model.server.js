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
        console.log("Inside model create widget: "+ widget.type);
        widget.dateCreated = new Date();
        widget._page = pageId;
        return WidgetModel
            .create(widget)
            .then(function (widgetObj) {
                return widgetObj;

               /* model.pageModel
                    .addWidgetToPage(pageId, widgetObj._id)
                    .then(function (widgets) {
                        console.log("new widget: "+ widgetObj._id);
                        console.log("widgets for page: "+ widgets.widgets);
                        // console.log("update widgets for page: "+ widgetobj.name);
                        return widgetObj;
                    });*/
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
            console.log("Update header");
           /* widgets[w].size = widget.size;
            widgets[w].text = widget.text;*/

            return WidgetModel
                .update({_id: widgetId},
                    {
                        size: widget.size,
                        text: widget.text,

                    });

        }else if(widget.type == 'IMAGE'){
            console.log("Update image");
            /*widgets[w].width = widget.width;
            widgets[w].url = widget.url;*/

            return WidgetModel
                .update({_id: widgetId},
                    {
                        width: widget.width,
                        url: widget.url,
                    });

        }else if(widget.type == 'YOUTUBE'){
            console.log("Update youtube");
            /*widgets[w].width = widget.width;
            widgets[w].url = widget.url;*/

            return WidgetModel
                .update({_id: widgetId},
                    {
                        width: widget.width,
                        url: widget.url,
                    });

        }else if(widget.type == 'HTML'){
            console.log("Update html");
            // widgets[w].text = widget.text;

            return WidgetModel
                .update({_id: widgetId},
                    {
                        text: widget.text,
                    });
        }


    }

    function deleteWidget(widgetId) {
        var pageId = WidgetModel.findById(widgetId)._page;

        return WidgetModel.remove({_id: widgetId})
            .then(function (res) {
                model.pageModel.deleteWidgetForPage(pageId, widgetId)
                    .then(function (pageObj) {
                        console.log("Website deleted and : "+pageObj);
                    })
            });
    }
    
    function reorderWidget(pageId, start, end) {
        console.log("Inside widget model sort: "+ pageId);
        return model.pageModel.reorderWidgetForPage(pageId, start, end);
    }
    
}