/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;

         PageService
            .findPageByWebsiteId(vm.websiteId)
            .success(function (pages) {
                vm.pages = pages;
            })
             .error(function (serverError) {
                 vm.error = "server returned error";
             });
    }
    
    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;


        vm.createNewPage = createNewPage;
        function createNewPage(name, title) {
            if(name === undefined){
                vm.error = "Name field cannot be empty";
            }else {
                var newPage = {
                    "_id": "", "name": name, "websiteId": vm.websiteId, "title" : title
                };
                PageService
                    .createPage(vm.websiteId, newPage)
                    .success(function (page) {
                        $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page");
                    })
                    .error(function (serverError) {
                        vm.error = "server returned error";
                    });

            }
        }
        
    }
    
    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;

        PageService
            .findPageById(vm.pageId)
            .success(function (page) {
                if(page != '0'){
                    vm.page = page;
                }
            })
            .error(function (serverError) {
                vm.error = "server returned error";
            });

        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function deletePage(localPageId) {
            PageService
                .deletePage(localPageId)
                .success(function (successFromServer) {
                    $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page");
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });

        }

        function updatePage(name, title) {
            if(name === undefined ||
                name === "" ||
                name === null) {
                vm.error = "Name field cannot be empty";
            } else {
                vm.page.name = name;
                vm.page.title = title;
                PageService
                    .updatePage(vm.pageId, vm.page)
                    .success(function (successFromServer) {
                        $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page");
                    })
                    .error(function (serverError) {
                        vm.error = "server returned error";
                    });

            }
        }
    }
})();