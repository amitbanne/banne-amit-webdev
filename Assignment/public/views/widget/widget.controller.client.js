(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)
        .controller("NewWidgetController",NewWidgetController)
        .controller("EditWidgetController",EditWidgetController);

    function WidgetListController($location, WidgetService,$routeParams, $sce) {
            var vm = this;
            vm.checkSafeHTML = checkSafeHTML;
            vm.formatYoutubeLink =formatYoutubeLink;
            vm.checkSafeImage = checkSafeImage;
            vm.updateWidget = updateWidget;
            vm.addNewWidget = addNewWidget;
            vm.createNew=createNew;
            vm.deleteWidget = deleteWidget;
        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            console.log("WidgetListController init "+ vm.userId);


        };
        init();
        
        function checkSafeHTML(html) {
            return $sce.trustAsHtml(html);
        }
        
        function formatYoutubeLink(url) {
            var urlParts = url.split('/');
            url = "https://www.youtube.com/embed/"+urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeImage(imageURL) {
            return $sce.trustAsResourceUrl(imageURL);
        }
        
        function addNewWidget() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
        }
        
        function updateWidget(widget) {
            console.log("update widget: "+ widget._id);
            vm.widget = widget;
            vm.widgetType = widget.type;
            vm.isUpdate = "UPDATE";
            vm.createOrUpdate = "UPDATE";
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
        }

        function createNew(widgetType){
            console.log("list controller");
            vm.widgetId = "123";
            vm.createOrUpdate = "CREATE";
            vm.widgetType = widgetType;
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+wid);
        }
        
        function deleteWidget(widgetId) {
            console.log("delete widget "+ widgetId);
        }
        
    }

    function NewWidgetController($location, WidgetService,$routeParams){
        var vm = this;
        vm.createNew = createNew;
        vm.createOrUpdateWidget =createOrUpdateWidget;
        function init() {
            console.log("new controller init");
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.createOrUpdate = "CREATE";
        }
        init();

        function createNew(widgetType){

            console.log("NewWidgetController: create new "+widgetType);
            vm.createOrUpdate = "CREATE";
            vm.widgetType = widgetType;
            vm.widget = getDummyWidget(widgetType, vm.pageId);

            vm.widget = WidgetService.createWidget(vm.pageId, vm.widget)
            vm.widgetId = vm.widget._id;
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
        }

        function getDummyWidget(widgetType, pageId){
            var widget = {};
            if(widgetType == "HEADER"){
                widget = {"widgetType": "HEADER", "pageId": pageId, "size": 2, "text": ""};
            }else if(widgetType == "IMAGE"){
                widget = {"widgetType": "IMAGE", "pageId": pageId, "width": "100%", "url": "http://lorempixel.com/400/200/", "text": "Sample Image"};
            }else if(widgetType == "YOUTUBE"){
                widget = {"widgetType": "YOUTUBE", "pageId": pageId, "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"};
            }else if(widgetType == "HTML"){
                widget = {"widgetType": "HTML", "pageId": pageId, "text": "<p>Lorem ipsum muspi meroL</p>"};
            }
            return widget;
        }

        function createOrUpdateWidget(widgetType, widget, createOrUpdate, widgetId){
            if(createOrUpdate == "CREATE") {
                WidgetService.createWidget(vm.pageId, widget);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }else{
                widget.type = widgetType;
                WidgetService.udpateWidget(widgetId, widget);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }
        }
    }
    
    function EditWidgetController($location, WidgetService,$routeParams){
        var vm = this;
        vm.createOrUpdateWidget = createOrUpdateWidget;
        vm.deleteWidget = deleteWidget;
        function init() {
            console.log("edit controller init");
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;

            console.log("EDIT ID: "+ vm.widgetId);
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            console.log("EDIT TYPE: "+ vm.widget.widgetType);

            vm.widgetType = vm.widget.widgetType;
            vm.lowercasewidgettype = vm.widgetType.toLowerCase();

            console.log("LOWER CASE: "+vm.lowercasewidgettype);

            console.log("edit controller end : "+vm.widgetType);
            //vm.createOrUpdate = "UPDATE";
        }
        init();

        function deleteWidget(widgetId) {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function createOrUpdateWidget(widgetType, widget, createOrUpdate, widgetId){
            console.log("edit controller createOrUpdateWidget function: "+ widgetType)
            if(createOrUpdate == "CREATE") {
                console.log("edit createOrUpdateWidget create: "+ widgetType);
                vm.widgetType = widgetType;
                vm.widget = WidgetService.createWidget(vm.pageId, vm.widget);
                vm.widgetId = vm.widget._id;
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                WidgetService.createWidget(vm.pageId, widget);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }else{
                console.log("edit createOrUpdateWidget edit: "+ widgetType);
                console.log("inside edit "+ widgetId);
                widget.type = widgetType;
                WidgetService.updateWidget(widgetId, widget);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }
        }

    }
    
})();