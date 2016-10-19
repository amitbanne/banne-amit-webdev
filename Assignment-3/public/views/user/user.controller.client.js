(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController",RegisterController)
        .controller("ProfileController",ProfileController);

        function LoginController($location, UserService){
            var vm = this;
            vm.login = login;

            // authenticate user
            function login(checkUser){
                // var user = null;
                vm.user = UserService.findUserByCredentials(checkUser.username, checkUser.password);
                // console.log("LOGIN: "+vm.user.firstName);

                if(vm.user == null)
                    vm.loginError = "No such user exists";
                else{
                    // console.log("LOGIN: "+user.firstName);
                    //vm.user = user;
                    // console.log(vm.user.firstName);
                    vm.id = vm.user._id;
                    console.log("ID: "+vm.id);
                    $location.url("/user/"+vm.user._id);
                }
            }
        }

        function RegisterController($location, UserService){

            var vm = this;
            vm.register = register;


            // register new user
            function register(userNew){
                /*if(userNew.password != verifyPassword)
                 vm.error="Passwords do not match..";
                 else{*/

                var user = null;
                user = UserService.createUser(userNew);

                if(user === null)
                    vm.registerError = "Oops.Something went wrong. Please try again";
                else {
                    vm.user = user;
                    $location.url("/user/" + vm.user._id);
                }
                // }
            }
        }

        function ProfileController($location, UserService, $routeParams){

            var vm = this;
            vm.findUserById = findUserById;

            function init(){
                console.log("ID IN PROFILE: "+ $routeParams.uid);
                vm.user = findUserById($routeParams.uid);
                vm.id = vm.user._id;
            }
            init();

            function findUserById(uid){
                var user = UserService.findUserById(uid);
                return user;
            }


        }
})();