/**
 * Created by Siddarthan on 26-Oct-16.
 */
module.exports = function (app) {

    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "name":"", "text":""},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    var multer = require('multer'); // npm install multer --save
    var mime = require('mime');  // npm install mime --save
    // var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/assignment/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });


    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);


    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var userId        = req.body.userId;
        var pageId        = req.body.pageId;
        var websiteId     = req.body.websiteId;
        var width         = req.body.width;
        var myFile        = req.file;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var wd in widgets){
            var widget = widgets[wd];
            if(widget._id === widgetId){
                widget.width = width;
                widget.name = filename;
                widget.url = "/assignment/uploads/"+filename;
            }
        }

        res.redirect('../assignment/index.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId);
        // res.send(200);http://localhost:3000/assignment/#/user/456/website/456/page/321/widget/345
    }

    function createWidget(req, res) {
        var widget = req.body;
        widget._id = String((new Date()).getTime());
        widgets.push(widget);
        res.send(JSON.parse(JSON.stringify(widget)));
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var widgetsForPage = [];
        for(var wd in widgets){
            var widget = widgets[wd];
            if(widget.pageId === pageId){
                widgetsForPage.push(JSON.parse(JSON.stringify(widget)));
            }
        }
        res.send(widgetsForPage);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for(var wd in widgets){
            var widget = widgets[wd];
            if(widget._id === widgetId){
                res.send(JSON.parse(JSON.stringify(widget)));
                return;
            }
        }
        res.send('0');
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        for(var wd in widgets) {
            var localWidget = widgets[wd];
            if (localWidget._id === widgetId) {
                widgets[wd] = widget;
                res.send('success');
                return;
            }
        }
        res.send('0');
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var wd in widgets){
            var widget = widgets[wd];
            if(widget._id === widgetId){
                widgets.splice(wd, 1);
                res.send('success');
                return;
            }
        }
        res.send('0');
    }
};
