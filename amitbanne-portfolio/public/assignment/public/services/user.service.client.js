(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService($http){

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            register: register,
            login: login,
            logout: logout,
            loggedIn: loggedIn
        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }
        
        function loggedIn() {
            console.log("inside client loggedin");
            return $http.get("/api/loggedIn");
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function login(username, password) {
            console.log("Login client service");
            var user = {
                username: username,
                password: password
            };
            console.log(user);
            //console.log(user);
            return $http.post('/api/login', user);
        }

        // create a new user
        function createUser(u){
            console.log("user service: "+u);
            var url = '/api/user/';
            return $http.post(url, u);
        }

        // find user by his user id
        function findUserById(_id){
            var url = '/api/user/'+_id;
            return $http.get(url);
        }

        // find user by his username
        function findUserByUsername(username){
            var url = '/api/user?username='+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password){
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }

        function updateUser(_id, user){
            var url = '/api/user/'+_id;
            return $http.put(url, user);
        }

        function deleteUser(_id){
            console.log("Delete client service: "+_id);
            var url = '/api/user/'+_id;
            return $http.delete(url);
        }

    }
})();