module.exports = function(app, model) {

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
        // var id = new Date().getMilliseconds();
        // user._id = id;
        user.dateCreated = new Date();
        // user.websites = [];

        model
            .userModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.json(newUser);
                },
                function (error) {
                    res.send(error);
                }
            )

        // users.push(user, 0);
        // res.send(user);
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
        console.log("Server find by name");
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.json(user);
                    }else{
                        res.send('0');
                    }
                    return;
                },
                function (error) {
                    res.send(error);
                    return;
                }
            )


        /*for(var u in users){
            if(users[u].username === username){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');*/
    }

    function findUserByCredentials(req, res) {
        console.log("Server find by cred");
        var username = req.query.username;
        var password = req.query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.send(error);
                }
            )


        /*for(var u in users){
            if(users[u].username === username
               &&users[u].password === password ){
                 res.send(users[u]);
                return;
            }
        }
        res.send('0');*/
    }

    function findUserById(req, res) {
        var userId = req.params.uid;

        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user){
                        res.json(user);
                    }else{
                        res.send('0');
                    }
                    return;
                },
                function (error) {
                    console
                    res.send(error);
                    return;
                }
            )
    }
    
    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.uid;

        model
            .userModel
            .updateUser(userId, user)
            .then(
                function (status) {
                    res.send(user);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.uid;
        console.log("Delete server service: "+userId);

        model
            .userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    return res.sendStatus(200);
                },
                function (error) {
                    return res.send('0');
                }
            );
    }
}