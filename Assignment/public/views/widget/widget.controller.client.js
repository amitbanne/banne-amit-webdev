(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)
        .controller("NewWidgetController",NewWidgetController)
        .controller("EditWidgetController",EditWidgetController);

    function WidgetListController($location, WidgetService,$routeParams, $sce, $rootScope) {
            var vm = this;
            vm.checkSafeHTML = checkSafeHTML;
            vm.formatYoutubeLink =formatYoutubeLink;
            vm.checkSafeImage = checkSafeImage;
            vm.updateWidget = updateWidget;
            vm.addNewWidget = addNewWidget;
            vm.sortWidgets = sortWidgets;
            vm.createNew=createNew;
        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            $rootScope.pageId = vm.pageId;

            console.log('PAGE: '+ vm.pageId);

            var promise = WidgetService.findWidgetsByPageId(vm.pageId);
            promise
                .success(function (widgets) {
                    if(widgets.length == 0){
                        vm.widgetListMessage = 'No widgets found for the page. Try creating one';
                    }else{
                        vm.widgets = widgets;
                        $("jga-sortable").sortable();
                    }
                })
                .error(function (widgets) {
                    vm.widgetListMessage = 'Something went wrong while fetching widgets for the page. Please try again';
                })
        };
        init();

        function sortWidgets(start, end) {
            console.log("in controller: "+start+", "+end);
            WidgetService.sortWidgets(vm.pageId, start, end);
        }


        function checkSafeHTML(html) {
            return $sce.trustAsHtml(html);
        }
        
        function formatYoutubeLink(url) {
            var urlParts = url.split('/');
            url = "https://www.youtube.com/embed/"+urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeImage(imageURL) {
            console.log("IMAGE SAFE: "+imageURL);
            return $sce.trustAsResourceUrl(imageURL);
        }
        
        function addNewWidget() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
        }
        
        function updateWidget(widget) {
            console.log("update widget list: "+ widget._id);
            vm.widget = widget;
            vm.widgetType = widget.type;
            vm.isUpdate = "UPDATE";
            vm.createOrUpdate = "UPDATE";
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
        }

        function createNew(widgetType){
            console.log("list controller new ");
            vm.widgetId = "123";
            vm.createOrUpdate = "CREATE";
            vm.widgetType = widgetType;
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+wid);
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

            var promise = WidgetService.findWidgetsByPageId(vm.pageId);
            promise
                .success(function (widgets) {
                    vm.widgets = widgets;
                    $("jga-sortable").sortable();
                })
                .error(function (widgets) {
                    
                })
        }
        init();

        function createNew(widgetType){

            console.log("NewWidgetController: create new "+widgetType);
            vm.createOrUpdate = "CREATE";
            vm.widgetType = widgetType;
            vm.widget = getDummyWidget(widgetType, vm.pageId);

            var promise = WidgetService.createWidget(vm.pageId, vm.widget);
            promise
                .success(function (widget) {
                    vm.widget = widget;
                    vm.widgetId = vm.widget._id;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                })
                .error(function (widget) {
                    vm.newWidgetMessage = 'Something went wrong. Please try again';
                })
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
                var promise = WidgetService.createWidget(vm.pageId, vm.widget);
                promise
                    .success(function (widget) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    })
                    .error(function (widget) {
                        vm.newWidgetMessage = 'Something went wrong. Please try again';
                    })
            }else{
                widget.type = widgetType;

                var promise = WidgetService.updateWidget(widgetId, widget);
                promise
                    .success(function (status) {
                        if(status == '200'){
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                        }else{
                            vm.newWidgetMessage = 'Something went wrong. Please try again';
                        }
                    })
                    .error(function (status) {

                    })

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
            var promise = WidgetService.findWidgetById(vm.widgetId);

            promise
                .success(function (widget) {
                    if(widget == '0'){
                        vm.editWidgetMessage = 'Something went wrong. Please try again';
                    }else{
                        vm.widget =widget;
                        vm.widgetType = vm.widget.widgetType;
                        vm.lowercasewidgettype = vm.widgetType.toLowerCase();
                    }
                })
                .error(function (widget) {
                    
                })
        }
        init();

        function deleteWidget(widgetId) {

            var promise = WidgetService.deleteWidget(widgetId);
            promise
                .success(function (status) {
                    if(status == '200'){
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    }else{
                        vm.editWidgetMessage = 'Deleting the widget failed. Please try again';
                    }
                })
                .error(function (status) {
                    vm.editWidgetMessage = 'Deleting the widget failed. Please try again';
                })
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
                console.log(widget);

                var promiseUpdate = WidgetService.updateWidget(widgetId, widget);
                promiseUpdate
                    .success(function (status) {
                        if(status == '200'){
                            console.log("Update success for "+widgetId);
                            var promiseFetchWidgets =  WidgetService.findWidgetsByPageId(vm.pageId);
                            promiseFetchWidgets
                                .success(function (widgets) {
                                    vm.widgets =widgets;
                                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                                })
                                .error(function (widgets) {
                                    console.log("Update failed");
                                })
                        }else{
                            vm.editWidgetMessage = 'Editing the widget failed. Please try again';
                        }
                    })
                    .error(function (status) {
                        vm.editWidgetMessage = 'Editing the widget failed. Please try again';
                    })

            }
        }

    }
    
})();