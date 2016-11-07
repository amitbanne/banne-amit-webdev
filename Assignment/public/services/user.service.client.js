(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService($http){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

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