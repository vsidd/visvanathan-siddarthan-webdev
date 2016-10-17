/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

        var api = {
            "createWebsite" : "createWebsite",
            "findWebsitesByUser" : "findWebsitesByUser",
            "findWebsiteById" : "findWebsiteById",
            "updateWebsite" : "updateWebsite",
            "deleteWebsite" : "deleteWebsite"
        }
        
        function createWebsite() {
            
        }
        
        function findWebsitesByUser(){
            
        }
        
        function findWebsiteById(){
            
        }
        
        function updateWebsite(){
            
        }
        
        function deleteWebsite() {
            
        }
    }
})();