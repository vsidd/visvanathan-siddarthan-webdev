/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);
    
    function WidgetListController() {
        var vm = this;
    }
    
    function NewWidgetController() {
        var vm = this;
    }
    
    function EditWidgetController() {
        var vm = this;
    }
})();