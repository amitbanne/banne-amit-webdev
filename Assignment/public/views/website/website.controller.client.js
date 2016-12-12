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
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function (websites) {
                    if(websites.length == 0 || websites[0] == null){
                        vm.websites = {};
                        vm.websiteListMessage = "No websites found for the user. Try creating one.";
                    }else{
                        vm.websites = websites;
                        vm.id = vm.userId;
                        console.log("ID: " + vm.id);
                    }
                })
                .error(function (websites) {
                    vm.websiteListMessage = "Website fetch for user failed. Please try again";
                })
        }
        init();

    }

    function NewWebsiteController($location, WebsiteService,$routeParams){
        var vm = this;
        vm.createWebsite = createWebsite;

        function init(){
            vm.userId = $routeParams.uid;
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function (websites) {
                    if(websites.length == 0){
                        vm.websites = {};
                    }else{
                        vm.websites = websites;
                        vm.id = vm.userId;
                        console.log("ID: " + vm.id);
                    }
                })
                .error(function (user) {
                    vm.websiteNewMessage = "Website fetch for user failed. Please try again";
                })
        }
        init();

        function createWebsite(userId, website){

            if(website==null || website.name == null || website.name == ''){
                vm.websiteNewMessage = "Website name cannot be blank";
                return;
            }

            var promise = WebsiteService.createWebsite(userId, website);
            promise
                .success(function (websites) {
                        vm.websites = websites;
                        vm.userId = userId;
                        vm.id = vm.userId;
                        console.log("ID: " + vm.id);
                        $location.url("/user/" + vm.userId+'/website');
                })
                .error(function (user) {
                    vm.websiteNewMessage = "New Website Creation failed. Please try again";
                    $location.url("/user/" + vm.userId+'/website/new');
                })
        }

    }

    function EditWebsiteController($location, WebsiteService, $routeParams){
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;

            var promiseById = WebsiteService.findWebsiteById(vm.websiteId);
            promiseById
                .success(function (website) {
                    console.log("W CTR: "+website);
                    vm.website = website;
                })
                .error(function (website) {
                })

            var promiseByUser = WebsiteService.findWebsitesByUser(vm.userId);
            promiseByUser
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (websites) {
                    vm.websiteEditError = "Website for the user could not be fetched. Please try again";
                })
        }
        init();

        function updateWebsite(userId, websiteId, website){

            if(website==null || website.name == null || website.name == ''){
                vm.websiteEditError = "Website name cannot be blank";
                return;
            }

            var promise = WebsiteService.updateWebsite(websiteId, website);
            promise
                .success(function (msg) {
                    console.log("Website Edit in EC:  "+msg);
                    if(msg == '200'){
                        $location.url("/user/" +userId+"/website");
                    }else{
                        vm.websiteEditError = "Website edit could not be saved. Please try again";
                    }
                })
                .error(function (msg) {
                    vm.websiteEditError = "Website edit could not happen. Please try again";
                })
        }

        function deleteWebsite(userId, websiteId) {
            var promiseDelete = WebsiteService.deleteWebsite(websiteId);
            promiseDelete
                .success(function () {
                    var promiseByUser = WebsiteService.findWebsitesByUser(vm.userId);
                    promiseByUser
                        .success(function (websites) {
                            vm.websites = websites;
                            $location.url("/user/" +userId+"/website");
                        })
                        .error(function (websites) {
                            vm.websiteEditError = "Something went wrong. Please go back and try again";
                        })
                })
                .error(function () {
                    vm.websiteEditError = "Website delete failed. Please try again";
                })
        }
    }

})();