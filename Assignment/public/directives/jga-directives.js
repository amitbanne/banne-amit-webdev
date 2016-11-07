(function() {
    angular
        .module("jgaDirectives", [])
        .directive("sortableWidgets", sortableWidgets);

    function sortableWidgets() {
        console.log("inside sorting");
        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            $(element).sortable({
                start: function (event, ui) {
                    start = $(ui.item).index();

                    console.log($(ui.valueOf()));

                },
                stop:function (event, ui) {
                    end = $(ui.item).index();
                    scope.SortableWidgetController.sort(start, end);
                }
            });
        }

        return{
            scope: {},
            restrict: 'C',
            link:linker,
            controller: SortableWidgetController,
            controllerAs: 'SortableWidgetController'
        }

        function SortableWidgetController(WidgetService) {
            var vm = this;
            vm.sort = sort;

            function sort (start, end) {
                WidgetService.sortWidgets(start, end);
            }
        }
        
    }
    
})();