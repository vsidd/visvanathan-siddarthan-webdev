/**
 * Created by Siddarthan on 26-Oct-16.
 */
module.exports = function (app, model) {

    // var widgets = [
    //     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/", "name":"", "text":""},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];

    var multer = require('multer'); // npm install multer --save
    var mime = require('mime');  // npm install mime --save

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
    app.put("/api/page/:pageId/widget", updateWidgetList);


    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var userId        = req.body.userId;
        var pageId        = req.body.pageId;
        var websiteId     = req.body.websiteId;
        var width         = req.body.width;
        var myFile        = req.file;

        if(myFile === undefined){
            res.send("No file attached to upload");
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;



        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    widget.width = width;
                    widget.name = filename;
                    widget.url = "/assignment/uploads/"+filename;
                    model
                        .widgetModel
                        .updateWidget(widgetId, widget)
                        .then(
                            function (status) {
                                res.redirect('../assignment/index.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId);
                            },
                            function (error) {
                                res.sendStatus(400).send(error);
                            }
                        )
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(
                function (newWidget) {
                    res.send(newWidget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    wd = widgets.widgets;
                    res.send(widgets)
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    if(widget){
                        res.send(widget)
                    }else{
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateWidgetList(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;

        model
            .widgetModel
            .reorderWidget(pageId, initial, final)
            .then(
                function (status) {
                res.send(200);
            },
                function (error) {
                res.sendStatus(400).send(error);
            })
    }
};
