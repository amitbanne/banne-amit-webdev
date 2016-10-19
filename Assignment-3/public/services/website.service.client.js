(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);


    function WebsiteService() {

        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description":"this is facebook"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description":"this is tweeter"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description":"this is Gizmodo"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description":"this is tic tac toe"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description":"this is checkers"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description":"this is chess"}
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite,
            deleteWebsite:deleteWebsite

        };
        return api;

        function createWebsite(userId, website){
            var webId = new Date();
            website.developerId = userId;
            website._id = webId;
            websites.push(websites.length, website);
        }

        function findWebsitesByUser(userId){
            var results = [];
            for(var u in websites){
                var website = websites[u];
                if(website.developerId == userId)
                    results.push(website);
            }
            return results;
        }

        function findWebsiteById(websiteId){
            for(var u in websites){
                var website = websites[u];
                if(website._id == websiteId)
                    return website;
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var u in websites){
                if(websites[u]._id == websiteId){
                    websites[u].name = website.name;
                    websites[u].description = website.description;
                    return;
                }
            }
        }

        function deleteWebsite(websiteId){
            websites.splice(websiteId,1);
        }
    }

})();