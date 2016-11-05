/**
 * Created by Siddarthan on 26-Oct-16.
 */
module.exports = function (app) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res){
        var page = req.body;
        page._id = String((new Date()).getTime());
        pages.push(page);
        res.send(JSON.parse(JSON.stringify(page)));
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        var pagesForWebsite = [];
        for(var p in pages){
            page = pages[p];
            if(page.websiteId === websiteId){
                pagesForWebsite.push(JSON.parse(JSON.stringify(page)));
            }
        }
        res.send(pagesForWebsite);
    }

    function findPageById(req, res){
        var pageId = req.params.pageId;
        for(var p in pages){
            page = pages[p];
            if(page._id === pageId){
                res.send(JSON.parse(JSON.stringify(page)));
                return;
            }
        }
        res.send('0');
    }

    function updatePage(req, res){
        var page = req.body;
        var pageId = req.params.pageId;
        for(var p in pages){
            localPage = pages[p];
            if(localPage._id === pageId){
                pages[p] = page;
                res.send('success');
                return;
            }
        }
        res.send('0');
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        for(var p in pages){
            page = pages[p];
            if(page._id === pageId){
                pages.splice(p, 1);
                res.send('success');
                return;
            }
        }
        res.send('0');
    }
};