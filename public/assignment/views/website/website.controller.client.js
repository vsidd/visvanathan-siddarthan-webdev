/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function WebsiteListController() {
        var vm = this;
    }
    
    function NewWebsiteController() {
        var vm = this;
    }
    
    function EditWebsiteController() {
        var vm = this;
    }
})();