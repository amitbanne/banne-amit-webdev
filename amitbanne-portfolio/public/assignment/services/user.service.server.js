
module.exports = function (app, model) {
    var passport = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    var bcrypt = require("bcrypt-nodejs");


    app.use(cookieParser());

    app.use(passport.initialize());
    app.use(passport.session());


    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));


    passport.serializeUser(serializeUser);


    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);


    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    var LocalStrategy = require('passport-local').Strategy;


    passport.use(new LocalStrategy(localStrategy));


    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));

    var facebookConfig = {
        clientID: "1693530404291551",
        clientSecret: "e8783719df65c58b824cae078886962d",
        callbackURL: "http://127.0.0.1:3000/auth/facebook/callback",
        profileFields: ['id', 'email', 'gender', 'name']
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {

        console.log(profile);
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {

                        return done(null, facebookUser);
                    }
                    else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        facebookUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            dateCreated: new Date(),
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        model.userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );



    }

   /* function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel.findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (!user) {
                        console.log("Not a member");
                        console.log(profile);
                        user = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                id: profile.id,
                                token: token
                            },
                            firstName: profile.displayName
                        };

                        return model.userModel.createUser(user);
                    }else{
                        console.log("user exists");
                        return done(null, user);
                    }

                },
                function (err) {
                    if (err) {
                        console.log("Error");
                        console.log(err)
                        return done(err);
                    }
                })
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if(err) return done(err);
                }
            );
    }*/




    function localStrategy(username, password, done) {
        model.userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user!= null && bcrypt.compareSync(password, user.password) && username == user.username) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.post('/api/register', register);
    app.get('/api/loggedin', loggedIn);
    app.post("/api/logout", logout);


    function login(req, res) {
        console.log("Login server");
        console.log(req.user);
        var user = req.user;
       return res.send(req.user);
    }

    function register(req, res) {
        var user = req.body;
        // var id = new Date().getMilliseconds();
        // user._id = id;
        user.dateCreated = new Date();
        // user.websites = [];
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser){
                    if(newUser){
                        req.login(newUser, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(newUser);
                            }
                        });
                    }
                }
            );
    }


    function loggedIn(req, res) {
        console.log("LoggedIN");
        console.log(req.user);
        res.send(req.isAuthenticated()? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

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
            );

        // users.push(user, 0);
        // res.send(user);
        return;
    }

    function findUser(req, res) {
        console.log("find user");
        console.log(req.user);

        var query = req.query;
        if (query.username && query.password) {
            return findUserByCredentials(req, res);
        } else if (query.username) {
            return findUserByUsername(req, res);
        }else{
            res.send(req.user);
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
                    if (user) {
                        return   res.json(user);
                    } else {
                        return  res.send('0');
                    }
                },
                function (error) {
                   return res.send(error);
                }
            );
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
                    console.log("find by cred inside");
                    console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.send(error);
                }
            )
    }

    function findUserById(req, res) {
        var userId = req.params.uid;

        model.userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    } else {
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
        console.log("Delete server service: " + userId);

        model.userModel
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