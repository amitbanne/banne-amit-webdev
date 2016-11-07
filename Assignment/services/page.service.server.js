module.exports = function(app) {

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page',findAllPagesForWebsite);
    app.get('/api/page/:pageId',findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId',deletePage);


    function createPage(req, res) {
        console.log('new page creation server');
        var websiteId = req.params.websiteId;
        var page = req.body;
        var id = new Date().getMilliseconds() * 895 - 36;
        page._id = id;
        page.websiteId = websiteId;
        pages.push(page, 0);
        res.send(pages);
    }
    
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var results = [];
        for(var p in pages){
            if(pages[p].websiteId == websiteId){
                results.push(pages[p]);
            }
        }
        res.send(results);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id == pageId){
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        for(var p in pages) {
            if (pages[p]._id == pageId) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.send('200');
                return;
            }
        }
        res.send('0');
    }
    
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if (pages[p]._id == pageId) {
                pages.splice(p,1);
                res.send('200');
                return;
            }
        }
        res.send('0');
    }
}