(function(){
    angular
        .module("WebAppMaker")
        .controller("UserController", UserController);
        function UserController($location, UserService){
            var vm = this;
            vm.login = login;
            vm.register = register;

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
                    $location.url("/user/"+vm.user._id);
                }
            }

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
                        $location.url("/user/" + user._id);
                    }
                // }
            }

        }
})();