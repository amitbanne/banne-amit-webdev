module.exports = function(app, model) {
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
        var websiteId = req.params.websiteId;
        var page = req.body;
        /*var id = new Date().getMilliseconds() * 895 - 36;
        page._id = id;
        page.websiteId = websiteId;
        pages.push(page, 0);
        res.send(pages);*/

        model.pageModel.createPage(websiteId, page)
            .then(function (pageObj) {
                res.json(pageObj);
            });
    }
    
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        return model.pageModel.findAllPagesForWebsite(websiteId)
            .then(function (resObj) {
                res.json(resObj.pages);
            })

        /*for(var p in pages){
            if(pages[p].websiteId == websiteId){
                results.push(pages[p]);
            }
        }
        res.send(results);*/
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        return model.pageModel.findPageById(pageId)
            .then(function (page) {
                res.json(page);
            });

        /*for(var p in pages){
            if(pages[p]._id == pageId){
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');*/
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        return model.pageModel.updatePage(pageId, page)
            .then(
                function (status) {
                    return res.send('200');
                },
                function (error) {
                    return res.send('0');
                }
            );

        /*for(var p in pages) {
            if (pages[p]._id == pageId) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.send('200');
                return;
            }
        }
        res.send('0');*/
    }
    
    function deletePage(req, res) {
        var pageId = req.params.pageId;

        return model.pageModel.deletePage(pageId)
            .then(
                function (status) {
                    return res.send('200');
                },
                function (error) {
                    return res.send('0');
                }
            );

        /*for(var p in pages) {
            if (pages[p]._id == pageId) {
                pages.splice(p,1);
                res.send('200');
                return;
            }
        }
        res.send('0');*/
    }
}