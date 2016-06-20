var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, models) {
    
    var userModel = models.userModel;

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));

    app.post("/api/user", createUser);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/user", getUsers);
    app.get("/api/user/login", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/loggedin", loggedin);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        var id = profile.id;
        var name = profile.displayName;
        userModel
            .findUserByFacebookId(id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = {
                            username: profile.displayname.replace(/ /g, ''),
                            facebook: {
                                id: id,
                                displayName: name
                            }
                        };
                        return userModel
                            .createUser(newUser);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.status(400).send("Username already exists");
                        return;
                    } else {
                        var encryptedPassword = bcrypt.hashSync(newUser.password);
                        newUser.password = encryptedPassword;
                        return userModel
                            .createUser(newUser);
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function (user) {
                    if(user) {
                        req.login(user, function(err) {
                            if(err) {
                                console.log("400");
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    return done(error, null);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (error) {
                    done(error, null);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        console.log(newUser);
        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("Username "+newUser.username+" is already in use");
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    console.log(error);
                    console.log('a');
                    res.status(400).send(error);
                }
            )
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function (user) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update user with ID: "+id);
                }
            )
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        
        userModel
            .deleteUser(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (eror) {
                    res.status(404).send("Unable to remove user with ID: "+id);
                }
            );
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        console.log([username, password]);

        if (username && password) {
            getUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            //res.send(users);
        }
    }

    function getUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    console.log(error);
                    console.log('a');
                    res.status(400).send(error);
                }
            )
    }
};
