/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, UserService, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });

            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();
    }

    function NewWebsiteController($location, $routeParams, UserService, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        vm.createNewWebsite = createNewWebsite;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });

            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();

        function createNewWebsite(name, description) {
            if(name){
                var newWebsite = {
                    "name": name, "description": description
                };
                WebsiteService
                    .createWebsite(userId, newWebsite)
                    .success(function (website) {
                        $location.url("/user/"+ website._user +"/website");
                    })
                    .error(function (serverError) {
                        vm.error = "server returned error";
                    });
            }else {
                vm.error = "Name field cannot be empty";
            }
        }
    }

    function EditWebsiteController($location, $routeParams, UserService, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });

            WebsiteService
                .findWebsiteById(websiteId)
                .success(function (website) {
                    if (website != '0') {
                        vm.website = website;
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });

            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });

        }
        init();

        function deleteWebsite(localWebsiteId) {
            WebsiteService
                .deleteWebsite(localWebsiteId)
                .success(function (successMsgFromServer) {
                    $location.url("/user/"+ userId +"/website");
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });

        }

        function updateWebsite(name, description) {
            if(name) {
                vm.website.name = name;
                vm.website.description = description;
                WebsiteService
                    .updateWebsite(websiteId, vm.website)
                    .success(function (successMsgFromServer) {
                        $location.url("/user/" + userId + "/website");
                    })
                    .error(function (serverError) {
                        vm.error = "server returned error";
                    });
            } else {
                vm.error = "Name field cannot be empty";
            }
        }
    }
})();