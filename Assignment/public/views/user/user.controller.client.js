(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        // authenticate user
        function login(checkUser) {

            var promise = UserService.findUserByCredentials(checkUser.username, checkUser.password);
            promise
                .success(function (user) {
                    if(user =='0'){
                        vm.loginError = "No such user exists";
                        $location.url("/login");
                    }else{
                        console.log("user retrieved: "+user);
                        vm.user = user;
                        vm.id = vm.user._id;
                        console.log("ID: " + vm.id);
                        $location.url("/user/" + vm.user._id);
                    }
                })
                .error(function (user) {
                    console.log("No user exists");
                    vm.loginError = "No such user exists";
                    $location.url("/login");
                })
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {

            var promise = UserService.createUser(user);
            promise
                .success(function (user) {
                    if(user =='0'){
                        vm.registerError = "Registration failed. Please try again";
                        $location.url("/register");
                    }else{
                        console.log("user retrieved: "+user);
                        vm.user = user;
                        vm.id = vm.user._id;
                        console.log("ID: " + vm.id);
                        $location.url("/user/" + vm.user._id);
                    }
                })
                .error(function (user) {
                    vm.registerError = "Registration failed. Please try again"
                })
        }
    }

    function ProfileController($location, UserService, $routeParams) {

        var vm = this;
        vm.findUserById = findUserById;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            console.log("ID IN PROFILE: " + $routeParams.uid);
            findUserById($routeParams.uid);
        }

        init();

        function findUserById(uid) {
            var promise = UserService.findUserById(uid);
            promise
                .success(function (user) {
                    console.log("user retrieved: "+user);
                    if(user == '0'){
                        console.log("error");
                        vm.loginError = "No such user exists";
                        $location.url("/login");
                    }else{
                        vm.user = user;
                        vm.id = vm.user._id;
                        console.log("PROFILE ID: " + vm.id);
                        $location.url("/user/" + vm.user._id);
                    }
                })
                .error(function (user) {
                    vm.loginError = "No such user exists";
                    $location.url("/login");

                })
        }
        
        function updateUser(user) {
            var promise  = UserService.updateUser(user._id, user);
            promise
                .success(function (user) {
                    if(user == '0'){
                        vm.loginError = "No such user exists";
                        $location.url("/login");
                    }else{
                        vm.user = user;
                        vm.id = vm.user._id;
                        console.log("PROFILE ID: " + vm.id);
                        $location.url("/user/" + vm.user._id);
                    }
                })
                .error(function (user) {
                    vm.profileMessage = "Profile Update failed. Please try again.";
                })
        }
        
        function deleteUser() {
            console.log("Delete client: "+vm.user._id);
            var promise  = UserService.deleteUser(vm.user._id);
            promise
                .success(function (user) {
                    if(user == '200')
                        $location.url("/login");
                })
                .error(function (user) {
                    vm.profileMessage = "Cannot delete account. Please try again.";
                })
        }
        
    }
})();