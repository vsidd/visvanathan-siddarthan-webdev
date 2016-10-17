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
            "createPage" : "createPage",
            "findPageByWebsiteId" : "findPageByWebsiteId",
            "findPageById" : "findPageById",
            "updatePage" : "updatePage",
            "deletePage" : "deletePage"
        };
        
        function createPage() {
            
        }
        
        function findPageByWebsiteId() {
            
        }
        
        function findPageById() {
            
        }
        
        function updatePage() {
            
        }
        
        function deletePage() {
            
        }
    }
})();