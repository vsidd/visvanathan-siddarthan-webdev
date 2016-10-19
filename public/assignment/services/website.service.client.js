/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456",  "description": ""},
            { "_id": "234", "name": "Tweeter",     "developerId": "456",  "description": "" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456",  "description": "" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123",  "description": "" },
            { "_id": "678", "name": "Checkers",    "developerId": "123",  "description": "" },
            { "_id": "789", "name": "Chess",       "developerId": "234",  "description": "" }
        ];

        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        }

        return api;
        
        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
        }
        
        function findWebsitesByUser(userId){
            var websitesForDeveloper = [];
            for(var w in websites){
                website = websites[w];
                if(website.developerId === userId){
                    websitesForDeveloper.push(website);
                }
            }
            return websitesForDeveloper;
        }
        
        function findWebsiteById(websiteId){
            for(var w in websites){
                website = websites[w];
                if(website._id === websiteId){
                    return website;
                }
            }
            return null;
        }
        
        function updateWebsite(websiteId, website){
            for(var w in websites){
                localWebsite = websites[w];
                if(localWebsite._id === websiteId){
                    websites[w] = website;
                    break;
                }
            }
        }
        
        function deleteWebsite(websiteId) {
            for(var w in websites){
                website = websites[w];
                if(website._id === websiteId){
                    websites.splice(w, 1);
                    break;
                }
            }
        }
    }
})();