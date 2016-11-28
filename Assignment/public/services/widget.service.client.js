(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http, $rootScope){

        var api = {
            createWidget:createWidget,
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            sortWidgets:sortWidgets
        };
        return api;

        function createWidget(pageId, widget){
            var url = '/api/page/'+pageId+'/widget';
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId){
            var url = '/api/page/'+pageId+'/widget';
            return $http.get(url);
        }

        function findWidgetById(widgetId){
            var url = '/api/widget/'+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget){
            console.log();
            var url = '/api/widget/'+widgetId;
            return $http.put(url,widget);
        }

        function deleteWidget(widgetId){
            var url = '/api/widget/'+widgetId;
            return $http.delete(url);
        }

        function sortWidgets(start, end) {
            var index1 = start;
            var index2 = end;
            var pageID = $rootScope.pageId;
            console.log("PAGE ID IN SERVICE: "+pageID);
            console.log(start+"=>"+end);
            var url = "/page/"+pageID+"/widget?initial="+index1+"&final="+index2;
            return $http.put(url);
        }
}
})();