/**
 * Created by Siddarthan on 05-Nov-16.
 */
(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable); //what to do for '-'

    function jgaSortable() {
        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element.sortable({
                start : function (event, ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    end = $(ui.item).index();
                    scope.sortableController.sort(start, end);
                }
            });
        }

        return {
            scope: {},
            link : linker,
            controller : sortableController,
            controllerAs: 'sortableController'
        }
    }
    function sortableController($routeParams, WidgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(start, end) {
             var pageId = $routeParams.pid;
            WidgetService
                .updateWidgetList(start, end, pageId)
                .success(function (successMessage) {
                    
                })
                .error(function (errorMessage) {
                    
                });
        }
    }
})();