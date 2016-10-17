(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService(){
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
        function createUser(user){
            //get last userId of existing users
            var last_id = parseInt(users[users.length-1]._id);
            var new_user_id = last_id+100;
            users.push(user);
            // change default return
            return users[0];
        }

        // find user by his user id
        function findUserById(_id){
            for(var u in users){
               var user = users[u];
                if(user._id == _id)
                    return user;
            }
            return null;
        }

        // find user by his username
        function findUserByUsername(username){
            for(var u in users){
                var user = users[u];
                if(user.username == username)
                    return user;
            }
            return null;
        }

        function findUserByCredentials(username, password){
            for(var u in users){
                var user = users[u];
                if( user.username == username
                    &&
                    user.password ==password)
                    return user;
            }
            return null;
        }
        function updateUser(_id, user){
            for(var u in users){
                var user = users[u];
                if( user._id == _id){
                    // remove the existing user record
                    users.splice(u,1);
                    // insert the new record
                    users.push(user);
                }
            }
        }

        function deleteUser(_id){
            for(var u in users){
                var user = users[u];
                if(user._id == _id){
                    // remove the existing user record
                    users.splice(u,1);
                }
            }
        }

    }
})();