module.exports = function(app) {

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description":"this is facebook"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description":"this is tweeter"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description":"this is Gizmodo"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description":"this is tic tac toe"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description":"this is checkers"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description":"this is chess"}
    ];

    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId',updateWebsite);
    app.delete('/api/website/:websiteId',deleteWebsite);

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        console.log("fetching websites for: "+userId);
        var results = [];
        for(var w in websites){
            if(websites[w].developerId == userId){
                console.log("found");
                results.push(websites[w]);
            }
        }
        console.log("fetched websites: "+results.length);
        res.send(results);
        return;
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;

        var websiteid = new Date().getMilliseconds()* 123+56;
        website._id = websiteid;
        website.developerId = userId;
        websites.push(website, 0);
        res.send(websites);
        return;
    }
    
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        console.log("fetching website with id: "+websiteId);
        for(var w in websites){
            if(websites[w]._id == websiteId){
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }


    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;

        for(var w in websites) {
            if (websites[w]._id == websiteId) {
                websites[w].developerId = website.developerId;
                websites[w].description = website.description;
                websites[w].name = website.name;
                res.send('200');
                return;
            }
        }
        res.send('0');
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if (websites[w]._id == websiteId) {
                websites.splice(w, 1);
                res.send('200');
                return;
            }
        }
        res.send('0');
    }
}