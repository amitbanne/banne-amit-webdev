module.exports = function(app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../public/uploads' });

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

    app.post ('/api/upload', upload.single('widgetImage'), uploadImage);
    app.post('/api/page/:pageId/widget',createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId',findWidgetById);
    app.put('/api/widget/:widgetId',updateWidget);
    app.delete('/api/widget/:widgetId',deleteWidget);
    app.put("/page/:pageId/widget?initial=index1&final=index2", sortWidgets);

    function uploadImage(req, res) {
        console.log("Hello Server from image upload");
        console.log("inside image upload");

        var widgetId      = req.body.widgetId;
        var pageId      = req.body.pageId;
        var userId      = req.body.userId;
        var websiteId      = req.body.websiteId;
        var width         = req.body.width;
        var widgetImage        = req.file;

        var originalname  = widgetImage.originalname; // file name on user's computer
        var filename      = widgetImage.filename;     // new file name in upload folder
        var path          = widgetImage.path;         // full path of uploaded file
        var destination   = widgetImage.destination;  // folder where file is saved to
        var size          = widgetImage.size;
        var mimetype      = widgetImage.mimetype;
        console.log("inside image upload");
        console.log(filename);


        var redirectURL = "../#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
        var url = "../public/uploads/"+filename;
        for(var w in widgets){
            if(widgets[w]._id == widgetId){
                widgets[w].url = url;
                res.redirect(redirectURL);
                return;
            }
        }
        redirectURL = "/public/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/";
        res.redirect(redirectURL);
    }



    function createWidget(req, res) {

        var pageId = req.params.pageId;
        var widget = req.body;

        var wid = new Date().getMilliseconds() * 231 +56 - 89;
        widget._id = wid;
        widget.pageId = pageId;
        widgets.push(widget, 0);
        res.send(widget);
    }

    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;
        console.log('SERVER FETCH WIDGETs for page: '+pageId);
        var results = [];
        for(var w in widgets){
            if(widgets[w].pageId == pageId){
                results.push(widgets[w]);
            }
        }
        console.log("FETCHED: "+results.length);
        res.send(results);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        console.log('SERVER FETCH WIDGET: '+widgetId);
        for(var w in widgets) {
            if (widgets[w]._id == widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        console.log("Updating widget: "+widgetId);
        console.log(widget);

        for(var w in widgets) {
            console.log("Inside loop update");
            if (widgets[w]._id == widgetId) {
                console.log("match found");
                if(widgets[w].widgetType == 'HEADER'){
                    console.log("Update header");
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
                }else if(widgets[w].widgetType == 'IMAGE'){
                    console.log("Update image");
                    widgets[w].width = widget.width;
                    widgets[w].url = widget.url;
                }else if(widgets[w].widgetType == 'YOUTUBE'){
                    console.log("Update youtube");
                    widgets[w].width = widget.width;
                    widgets[w].url = widget.url;
                }else if(widgets[w].widgetType == 'HTML'){
                    console.log("Update html");
                    widgets[w].text = widget.text;
                }

                res.send('200');
                return;
            }

        }
        res.send('0');
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.send('200');
                return;
            }
        }
        res.send('0');
    }

    function sortWidgets(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.initial;
        var end = req.query.final;

        var results = [];
        for(var w in widgets){
            if(widgets[w].pageId == pageId){
                results.push(widgets[w]);
                widgets.splice(w,1);
            }
        }

        results.splice(end, 0, results.splice(start, 1)[0]);
        for(var w in results){
            widgets.push(results[w]);
        }
    }

}