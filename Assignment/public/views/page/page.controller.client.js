(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController",EditPageController);

    function PageListController($location, PageService, $routeParams){
        var vm = this;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

    }

    function NewPageController($location, PageService, $routeParams){
        var vm = this;
        vm.createPage = createPage;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage(userId,websiteId, page){
            PageService.createPage(websiteId,page);
            vm.userId = userId;
            $location.url("/user/" +userId+"/website/"+websiteId+"/page");
        }

    }

    function EditPageController($location, PageService, $routeParams){
        var vm = this;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.page = PageService.findPageById(vm.pageId);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function updatePage(userId,websiteId,pageId, page) {
            PageService.updatePage(pageId, page);
            vm.userId = userId;
            vm.websiteId = websiteId;
            $location.url("/user/" +userId+"/website/"+websiteId+"/page");
        }

        function deletePage(userId,websiteId,pageId) {
            PageService.deletePage(pageId);
            vm.userId = userId;
            vm.websiteId = websiteId;
            $location.url("/user/" +userId+"/website/"+websiteId+"/page");
        }


    }




})();