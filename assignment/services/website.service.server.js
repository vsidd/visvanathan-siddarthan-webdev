/**
 * Created by Siddarthan on 26-Oct-16.
 */
module.exports = function (app, model) {
    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "developerId": "456",  "description": ""},
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456",  "description": "" },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456",  "description": "" },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123",  "description": "" },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123",  "description": "" },
    //     { "_id": "789", "name": "Chess",       "developerId": "234",  "description": "" }
    // ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        model
            .websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function (newWebsite) {
                    res.send(newWebsite);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.send(websites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    if(website){
                        res.send(website);
                    }else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function (status) {
                    res.send(200)
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};