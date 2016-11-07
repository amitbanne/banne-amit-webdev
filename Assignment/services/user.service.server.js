module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  , email:"alice@gmail.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , email:"bob@gmail.com" },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"   , email:"charly@gmail.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi"  , email:"jannunzi@gmail.com"}
    ];


    app.post('/api/user',  createUser);
    app.get('/api/user',  findUser);
    app.get('/api/user/:uid',  findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);


    function createUser(req, res) {
        var user = req.body;
        var id = new Date().getMilliseconds();
        user._id = id;
        users.push(user, 0);
        res.send(user);
        return;
    }

    function findUser(req, res) {
        var query = req.query;
        if(query.username && query.password){
            return findUserByCredentials(req, res);
        }else if(query.username){
            return findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users){
            if(users[u].username === username){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        for(var u in users){
            if(users[u].username === username
               &&users[u].password === password ){
                 res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        console.log("SERVER ID OF USER: "+userId);
        for(var u in users){
            if(users[u]._id == userId){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }
    
    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.uid;
        for(var u in users) {
            if (users[u]._id == userId) {
                users[u].username = user.username;
                users[u].firstName = user.firstName;
                users[u].lastName = user.lastName;
                users[u].email = user.email;
                res.send(user);
                return;
            }
        }
    }

    function deleteUser(req, res) {
        var userId = req.params.uid;
        console.log("Delete server service: "+userId);
        for(var u in users) {
            if (users[u]._id == userId) {
                console.log("deleting user");
                users.splice(u, 1);
                res.send('200');
                return;
            }
        }
        res.send('0');
    }
}