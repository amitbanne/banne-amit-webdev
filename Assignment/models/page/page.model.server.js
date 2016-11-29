module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        setModel: setModel,
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        addWidgetToPage: addWidgetToPage,
        deleteWidgetForPage: deleteWidgetForPage,
        findAllWidgetsForPage: findAllWidgetsForPage,
        reorderWidgetForPage: reorderWidgetForPage
    }
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page){
        page.dateCreated = new Date();
        page._website = websiteId;
        return PageModel
            .create(page)
            .then(function (pageObj) {
                model.websiteModel
                    .addPageToWebsite(websiteId, pageObj._id)
                    .then(function (pages) {
                        return pages;
                    });
            });
    }

    
    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findPagesForWebsite(websiteId);
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }
    
    function updatePage(pageId, page) {
        return PageModel
            .update({_id: pageId},
                {
                    name: page.name,
                    title: page.title,
                    description: page.description
                });
    }

    function deletePage(pageId) {
        return PageModel.findById(pageId)
            .then(function (pageObj) {
                var websiteId = pageObj._website;
                return PageModel.remove({_id: pageId}) //delete the page from page table
                    .then(function (res) {
                        model.websiteModel.deletePageForWebsite(websiteId, pageId)
                            .then(function (websiteObj) {

                            })
                    });
            });
    }

    function addWidgetToPage(pageId, widgetId) {
        return PageModel.update({_id: pageId},{$push:{widgets: widgetId}});
    }

    function deleteWidgetForPage(pageId, widgetId) {
        return PageModel.update({_id: pageId},{$pull:{widgets: widgetId}});
    }

    function findAllWidgetsForPage(pageId) {
        return PageModel.findById(pageId)
            .populate("widgets")
            .exec();
    }


    function reorderWidgetForPage(pageId, start, end) {
        return PageModel.findById(pageId)
            .then(function (pageObj) {
                console.log("$Page: "+pageId);
                var widgetsForPage = pageObj.widgets;
                pageObj.widgets.splice(end-1, 0, pageObj.widgets.splice(start-1, 1)[0]);
                PageModel.update({_id: pageId},{$set: {widgets: pageObj.widgets}})
                    .then(function (res) {
                        console.log("RESULT: "+res);
                    });
            });
    }
    
}