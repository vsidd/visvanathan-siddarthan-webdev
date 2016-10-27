/**
 * Created by Siddarthan on 26-Oct-16.
 */
module.exports = function (app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456",  "description": ""},
        { "_id": "234", "name": "Tweeter",     "developerId": "456",  "description": "" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456",  "description": "" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123",  "description": "" },
        { "_id": "678", "name": "Checkers",    "developerId": "123",  "description": "" },
        { "_id": "789", "name": "Chess",       "developerId": "234",  "description": "" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        website._id = String((new Date()).getTime());
        websites.push(website);
        res.send(JSON.parse(JSON.stringify(website)));
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var websitesForDeveloper = [];
        for(var w in websites){
            var website = websites[w];
            if(website.developerId === userId){
                websitesForDeveloper.push(JSON.parse(JSON.stringify(website)));
            }
        }
        res.send(websitesForDeveloper);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites){
            var website = websites[w];
            if(website._id === websiteId){
                res.send(JSON.parse(JSON.stringify(website)));
                return;
            }
        }
        res.send('0');
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        for(var w in websites){
            if(websites[w]._id === websiteId){
                websites[w] = website;
                res.send('success');
                return;
            }
        }
        res.send('0');
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites){
            if(websites[w]._id === websiteId){
                websites.splice(w, 1);
                res.send('success');
                return;
            }
        }
        res.send('0');
    }
};