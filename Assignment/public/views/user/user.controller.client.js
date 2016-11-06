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

            var promise = UserService.findUserByCredentials(checkUser.username, checkUser.password)
            promise
                .success(function (user) {
                    console.log("user retrieved: "+user);
                    vm.user = user;
                    vm.id = vm.user._id;
                    console.log("ID: " + vm.id);
                    $location.url("/user/" + vm.user._id);
                })
                .error(function (user) {
                    vm.loginError = "No such user exists";
                })
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function init() {
            var user = {
                username: "abc",
                password: "pwd"
            }
            vm.user = user;
        }
        
        function register(user) {

            console.log("USer: "+user);

            var promise = UserService.createUser(user);

            promise
                .success(function (user) {
                    console.log("user retrieved: "+user);
                    vm.user = user;
                    vm.id = vm.user._id;
                    console.log("ID: " + vm.id);
                    $location.url("/user/" + vm.user._id);
                })
                .error(function (user) {
                    vm.loginError = "No such user exists";
                })

            if (user === null)
                vm.registerError = "Oops.Something went wrong. Please try again";
            else {
                vm.user = user;
                $location.url("/user/" + vm.user._id);
            }
            // }
        }
    }

    function ProfileController($location, UserService, $routeParams) {

        var vm = this;
        vm.findUserById = findUserById;

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
                        vm.loginError = "No such user exists";
                    }else{
                        vm.user = user;
                        vm.id = vm.user._id;
                        console.log("ID: " + vm.id);
                        $location.url("/user/" + vm.user._id);
                    }
                })
                .error(function (user) {
                    vm.loginError = "No such user exists";
                })
        }
    }
})();