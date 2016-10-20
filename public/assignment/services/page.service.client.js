/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "" }
        ];

        var api = {
            "createPage" : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }
        
        function findPageByWebsiteId(websiteId) {
            var pagesForWebsite = [];
            for(var p in pages){
                page = pages[p];
                if(page.websiteId === websiteId){
                    pagesForWebsite.push(JSON.parse(JSON.stringify(page)));
                }
            }
            return pagesForWebsite;
        }
        
        function findPageById(pageId) {
            for(var p in pages){
                page = pages[p];
                if(page._id === pageId){
                    return JSON.parse(JSON.stringify(page));
                }
            }
            return null;
        }
        
        function updatePage(pageId, page) {
            for(var p in pages){
                localPage = pages[p];
                if(localPage._id === pageId){
                    pages[p] = page;
                    break;
                }
            }
        }
        
        function deletePage(pageId) {
            for(var p in pages){
                page = pages[p];
                if(page._id === pageId){
                    pages.splice(p, 1);
                    break;
                }
            }
        }
    }
})();