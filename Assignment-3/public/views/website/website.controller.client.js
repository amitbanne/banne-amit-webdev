(function (){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController);



    function WebsiteListController(WebsiteService,$routeParams){

        var vm = this;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

    }

    function NewWebsiteController($location, WebsiteService,$routeParams){
        var vm = this;
        vm.createWebsite = createWebsite;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createWebsite(userId, website){
            vm.userId = $routeParams.uid;
            WebsiteService.createWebsite(userId, website);
            $location.url("/user/" +userId+"/website");

        }
    }

    function EditWebsiteController($location, WebsiteService, $routeParams){
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);

        }
        init();

        function updateWebsite(userId, websiteId, website){
            WebsiteService.updateWebsite(websiteId, website);
            $location.url("/user/" +userId+"/website");
        }

        function deleteWebsite(userId, websiteId) {
            console.log("Inside delete");
            WebsiteService.deleteWebsite(websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(userId);
            vm.userId = userId;
            $location.url("/user/" +userId+"/website");
        }
    }

})();