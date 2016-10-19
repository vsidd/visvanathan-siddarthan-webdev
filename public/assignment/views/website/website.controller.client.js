/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    var idGen = 500;
    function WebsiteListController($routeParams, UserService, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        var user = UserService.findUserById(userId);
        if(user != null) {
            vm.user = user;
        }

        vm.websites = WebsiteService.findWebsitesByUser(userId);

    }

    function NewWebsiteController($location, $routeParams, UserService, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var user = UserService.findUserById(userId);
        if(user != null) {
            vm.user = user;
        }

        var websites = WebsiteService.findWebsitesByUser(userId);
        if(websites != null){
            vm.websites = websites;
        }

        vm.createNewWebsite = createNewWebsite;

        function createNewWebsite(name, description) {
            if(name === undefined){
                vm.error = "Name field cannot be empty";
            }else {
                idGen = idGen + 1;
                var newId = idGen.toString();
                var newWebsite = {
                    "_id": newId, "name": name, "developerId": userId, "description": description
                };
                WebsiteService.createWebsite(userId, newWebsite);
                $location.url("/user/"+ userId +"/website");
            }
        }
    }

    function EditWebsiteController($location, $routeParams, UserService, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        var user = UserService.findUserById(userId);
        if(user != null) {
            vm.user = user;
        }

        var website = WebsiteService.findWebsiteById(websiteId);
        if(website != null){
            vm.website = website;
        }

        var websites = WebsiteService.findWebsitesByUser(userId);
        if(websites != null){
            vm.websites = websites;
        }

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function deleteWebsite(localWebsiteId) {
            WebsiteService.deleteWebsite(localWebsiteId);
            $location.url("/user/"+ userId +"/website");
        }

        function updateWebsite(name, description) {
            if(name === undefined ||
                name === "" ||
                name === null) {
                vm.error = "Name field cannot be empty";
            } else {
                website.name = name;
                website.description = description;
                WebsiteService.updateWebsite(websiteId, website);
                $location.url("/user/" + userId + "/website");
            }
        }
    }
})();