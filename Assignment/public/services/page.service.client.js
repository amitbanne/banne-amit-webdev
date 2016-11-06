(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {

        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        var api = {
            createPage:createPage,
            findPageByWebsiteId:findPageByWebsiteId,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage:deletePage
        };

        return api;

        function createPage(websiteId, page){
            page.websiteId = websiteId;
            var pid = new Date();
            page._id = pid;

            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for(var p in pages){
                var page = pages[p];
                if(page.websiteId == websiteId)
                    result.push(page);
            }
            return result;

        }

        function findPageById(pageId){
            for(var p in pages){
                var page = pages[p];
                if(page._id == pageId)
                    return page;
            }
            return null;
        }
        
        function updatePage(pageId, page) {
            pages[pageId].name = page.name;
            pages[pageId].description = page.description;
        }
        
        function deletePage(pageId) {
            pages.splice(pageId, 1);
        }
    }
})();