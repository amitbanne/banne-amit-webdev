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
        reorderWidget:reorderWidget
    }
    return api;

    function setModel(_model) {
        model = _model;
    }
    
    function createWidget(pageId, widget) {
        widget.dateCreated = new Date();
        widget._website = websiteId;
        return WidgetModel
            .create(widget)
            .then(function (widgetObj) {
                model.pageModel
                    .addWidgetToPage(pageId, widgetObj._id)
                    .then(function (widgets) {
                        console.log("Update widgets for website: "+ widgets);
                        return widgets;
                    });
            });
    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId);
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {

        if(widget.widgetType == 'HEADER'){
            console.log("Update header");
           /* widgets[w].size = widget.size;
            widgets[w].text = widget.text;*/

            return WidgetModel
                .update({_id: widgetId},
                    {
                        size: widget.size,
                        text: widget.text,

                    });

        }else if(widget.widgetType == 'IMAGE'){
            console.log("Update image");
            /*widgets[w].width = widget.width;
            widgets[w].url = widget.url;*/

            return WidgetModel
                .update({_id: widgetId},
                    {
                        width: widget.width,
                        url: widget.url,

                    });

        }else if(widget.widgetType == 'YOUTUBE'){
            console.log("Update youtube");
            /*widgets[w].width = widget.width;
            widgets[w].url = widget.url;*/

            return WidgetModel
                .update({_id: widgetId},
                    {
                        width: widget.width,
                        url: widget.url,

                    });

        }else if(widget.widgetType == 'HTML'){
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
}