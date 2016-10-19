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

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;

        // var user = UserService.findUserById(userId);
        // if(user != null) {
        //     vm.user = user;
        // }
        //
        // var website = WebsiteService.findWebsiteById(websiteId);
        // if(website != null) {
        //     vm.website = website;
        // }
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
    }
    
    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;

        // var user = UserService.findUserById(userId);
        // if(user != null) {
        //     vm.user = user;
        // }
        //
        // var website = WebsiteService.findWebsiteById(websiteId);
        // if(website != null) {
        //     vm.website = website;
        // }

        vm.createNewPage = createNewPage;
        function createNewPage(name, title) {
            if(name === undefined){
                vm.error = "Name field cannot be empty";
            }else {
                idGen = idGen + 1;
                var newId = idGen.toString();
                var newPage = {
                    "_id": newId, "name": name, "websiteId": vm.websiteId, "title" : title
                };
                PageService.createPage(vm.websiteId, newPage);
                $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page");
            }
        }
        
    }
    
    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;

        var page = PageService.findPageById(vm.pageId);
        if(page != null){
            vm.page = page;
        }
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function deletePage(localPageId) {
            PageService.deletePage(localPageId);
            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page");
        }

        function updatePage(name, title) {
            if(name === undefined ||
                name === "" ||
                name === null) {
                vm.error = "Name field cannot be empty";
            } else {
                vm.page.name = name;
                vm.page.title = title;
                PageService.updatePage(vm.pageId, vm.page);
                $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page");
            }
        }
    }
})();