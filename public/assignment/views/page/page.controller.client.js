/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)
    var idGen = 600;

    function PageListController($routeParams, PageService, UserService, WebsiteService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;

        var user = UserService.findUserById(userId);
        if(user != null) {
            vm.user = user;
        }

        var website = WebsiteService.findWebsiteById(websiteId);
        if(website != null) {
            vm.website = website;
        }
        vm.pages = PageService.findPageByWebsiteId(websiteId);
    }
    
    function NewPageController() {
        var vm = this;
    }
    
    function EditPageController() {
        var vm = this;
    }
})();