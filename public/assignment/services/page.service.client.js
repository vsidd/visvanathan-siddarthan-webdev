/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        var api = {
            "createPage" : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };
        
        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }
        
        function findPageByWebsiteId(websiteId) {
            for(var p in pages){
                page = pages[p];
                if(page.websiteId === websiteId){
                    return page;
                }
            }
            return null;
        }
        
        function findPageById(pageId) {
            for(var p in pages){
                page = pages[p];
                if(page._id === pageId){
                    return page;
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