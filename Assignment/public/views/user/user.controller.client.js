(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("LogoutController", LogoutController)
        .controller("ProfileSecureController", ProfileSecureController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;

        // authenticate user
        function login(username, password) {

            if(username == null || username.trim().length ==0 ){
                vm.loginError = "Username cannot be blank";
            }else if(password == null || password.trim().length ==0){
                vm.loginError = "Password cannot be blank";
            }else{
                UserService
                    .login(username, password)
                    .then(
                        function (res) {
                            console.log("login after");
                            console.log(res);

                            if (res.status == 401) {
                                vm.loginError = "No such user exists";
                                $location.url("/login");
                            } else if(res.data){
                                // vm.user = res.data[0];
                                vm.user = res.data;
                                $rootScope.user = vm.user;
                                vm.id = vm.user._id;
                                console.log("ID: " + vm.id);
                                $location.url("/user/" + vm.user._id);
                            }else{
                                vm.loginError = "No such user exists";
                                $location.url("/login");
                            }
                        },
                        function (err) {

                            console.log("No user exists");
                            console.log(err);
                            vm.loginError = "No such user exists";
                            $location.url("/login");
                        }
                    )
            }


        }
    }

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;


        function register(user, verifyPassword) {

            console.log(user);

            if(user ==null){
                vm.registerError = "Username field cannot be blank";
                return;
            }

            if (user.username == null || user.username == "") {
                vm.registerError = "Username field cannot be blank";
                return;
            }
            else if (user.password == null || user.password == "") {
                vm.registerError = "Password field cannot be blank";
                return;
            }
            else if (verifyPassword == null || verifyPassword == "") {
                vm.registerError = "Verify password field cannot be blank";
                return;
            }
            else if (user.password != verifyPassword) {
                vm.registerError = "Passwords do not match";
                return;
            }

            var promise = UserService.register(user);
            promise
                .success(function (res) {
                    if (res == '0') {
                        vm.registerError = "Registration failed. Please try again";
                        $location.url("/register");
                    } else {
                        console.log("RC: ");
                        console.log(res);
                        vm.user = res;
                        $rootScope.user = vm.user;
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

    function ProfileController($location, UserService, $routeParams,$rootScope) {

        var vm = this;
        vm.findUserById = findUserById;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
        console.log("inside pc");
            console.log($rootScope.user);

            var userId = $rootScope.user._id;
            // console.log("ID IN PROFILE: " + $routeParams.uid);
            findUserById(userId);
        }

        init();

        function findUserById(uid) {
            var promise = UserService.findUserById(uid);
            promise
                .success(function (res) {
                    console.log("user retrieved: " + res.data);
                    if (res.data == '0') {
                        console.log("error");
                        vm.loginError = "No such user exists";
                        $location.url("/login");
                    } else {
                        vm.user = res;
                        console.log("PC user by id :" + res);
                        vm.id = vm.user._id;
                        $location.url("/user/" + vm.user._id);
                    }
                })
                .error(function (res) {
                    vm.loginError = "No such user exists";
                    $location.url("/login");

                })
        }

        function updateUser(user) {
            console.log("Updating user: " + user._id);
            var promise = UserService.updateUser(user._id, user);
            promise
                .success(function (res) {
                    if (res == '0') {
                        vm.loginError = "No such user exists";
                        $location.url("/login");
                    } else {
                        vm.user = res;
                        vm.id = vm.user._id;
                        console.log("PROFILE ID: " + vm.id);
                        $location.url("/user/" + vm.user._id);
                    }
                })
                .error(function (res) {
                    vm.profileMessage = "Profile Update failed. Please try again.";
                })
        }

        function deleteUser() {
            console.log("Delete client: " + vm.user._id);
            var promise = UserService.deleteUser(vm.user._id);
            promise
                .success(function (res) {
                    if (res == 200)
                        $location.url("/login");
                })
                .error(function (res) {
                    vm.profileMessage = "Cannot delete account. Please try again.";
                })
        }

    }

    function LogoutController($location, UserService, $routeParams, $rootScope) {
        var vm = this;
        vm.logout = logout;

        function init() {
            logout();
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (res) {
                        $rootScope.user = null;
                        $location.url("/login");
                    },
                    function (error) {
                        $rootScope.user = null;
                        $location.url("/login");
                    })
        }
    }

    function ProfileSecureController($location, UserService, $routeParams, $rootScope) {

    }

})();