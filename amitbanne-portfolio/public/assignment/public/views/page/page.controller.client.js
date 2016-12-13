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
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                    if(pages.length == 0){
                        vm.pageListError = 'No Pages found for the website. Try creating one.';
                    }else{

                        vm.pages = pages;
                    }
                })
                .error(function (pages) {
                    vm.pageListError = 'Something went wrong. Please try loging in again.';
                })
        }
        init();

    }

    function NewPageController($location, PageService, $routeParams){
        var vm = this;
        vm.createPage = createPage;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;

            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                        vm.pages = pages;
                })
                .error(function (pages) {
                    // do nothing
                })

        }
        init();

        function createPage(userId,websiteId, page){

            if(page==null || page.name == null || page.name == ''){
                vm.newPageError = "Page name cannot be blank";
                return;
            }

            var promise = PageService.createPage(websiteId,page);
            promise
                .success(function (res) {
                    vm.pages = PageService.findPageByWebsiteId(websiteId);
                    $location.url("/user/" +userId+"/website/"+websiteId+"/page");
                })
                .error(function (pages) {
                    vm.newPageError = 'New Page creation failed. Please try again.';
                })
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
            var promiseById = PageService.findPageById(vm.pageId);
            promiseById
                .success(function (page) {
                    vm.page = page;
                    var promiseList = PageService.findPageByWebsiteId(vm.websiteId);
                    promiseList
                        .success(function (pages) {
                            vm.pages = pages;
                        })
                        .error(function (pages) {
                            // do nothing
                        })
                })
                .error(function (page) {
                    vm.newPageError = 'Page details could not be fetched. Please try again.';
                })

            var promiseByWebsiteID = PageService.findPageByWebsiteId(vm.websiteId);
            promiseByWebsiteID
                .success(function (pages) {
                    vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
                })
                .error(function (pages) {

                })
        }
        init();

        function updatePage(userId,websiteId,pageId, page) {

            if(page==null ||page.name == null || page.name == ''){
                vm.editPageError = "Page name cannot be blank";
                return;
            }

            var promise = PageService.updatePage(pageId, page);
            promise
                .success(function (status) {
                    if(status == '200'){
                        vm.userId = userId;
                        vm.websiteId = websiteId;
                        var promiseList = PageService.findPageByWebsiteId(vm.websiteId);
                        promiseList
                            .success(function (pages) {
                                vm.pages = pages;
                            })
                            .error(function (pages) {
                                // do nothing
                            })
                        $location.url("/user/" +userId+"/website/"+websiteId+"/page");
                    }else{
                        vm.editPageError = 'Editing the page failed. Please try again.';
                    }
                })
                .error(function (status) {
                    vm.editPageError = 'Editing the page failed. Please try again.';
                })
        }

        function deletePage(userId,websiteId,pageId) {
            var promise = PageService.deletePage(pageId);
            promise
                .success(function (status) {
                    if(status == '200'){
                        vm.userId = userId;
                        vm.websiteId = websiteId;
                        var promiseList = PageService.findPageByWebsiteId(vm.websiteId);
                        promiseList
                            .success(function (pages) {
                                vm.pages = pages;
                            })
                            .error(function (pages) {
                                // do nothing
                            })
                        $location.url("/user/" +userId+"/website/"+websiteId+"/page");
                    }else{
                        vm.editPageError = 'Deleting the page failed. Please try again.';
                    }
                })
                .error(function (status) {
                    vm.editPageError = 'Deleting the page failed. Please try again.';
                })
        }
    }

})();