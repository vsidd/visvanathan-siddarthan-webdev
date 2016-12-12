/**
 * Created by Siddarthan on 03-Dec-16.
 */

module.exports = function (app, model) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');
    var bcrypt = require("bcrypt-nodejs");

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



    app.post("/api/project/user", createUser);
    app.get("/api/project/user", getUser);
    app.get("/api/project/user/:userId", getUserById);
    app.get("/api/project/users/pokemons",findAllUsersPokemons);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);
    app.post('/api/project/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['profile','email'] }));
    app.post('/api/project/logout', logout);
    app.post ('/api/project/register', register);
    app.post('/api/project/checkLoggedin', checkLoggedin);

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModelPL
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

    function localStrategy(username, password, done) {
        model
            .userModelPL
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && user.username === username && bcrypt.compareSync(password, user.password)) {
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

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .userModelPL
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if(user){
                        return done(null,user);
                    }else{
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newFacebookUser = {
                            username: emailParts[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return model.userModelPL.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if(err){
                        return done(err);
                    }
                }

            )
            .then(
                function (user) {
                    return done(null,user);
                },
                function (err) {
                    if(err){
                        return done(err);
                    }
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

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .userModelPL
            .findUserByUsername(user.username)
            .then(
                function (retrivedUser) {
                    if(retrivedUser){
                        res.send('0');
                    }else{
                        model
                            .userModelPL
                            .createUser(user)
                            .then(
                                function(user){
                                    if(user){
                                        req.login(user, function(err) {
                                            if(err) {
                                                res.status(400).send(err);
                                            } else {
                                                res.json(user);
                                            }
                                        });
                                    }
                                }
                            );
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function checkLoggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function createUser(req, res){
        var user = req.body;
        model
            .userModelPL
            .findUserByUsername(user.username)
            .then(
                function (retrivedUser) {
                    if(retrivedUser){
                        res.send('0');
                    }else{
                        model
                            .userModelPL
                            .createUser(user)
                            .then(
                                function (newUser) {
                                    if(newUser) {
                                        res.send(newUser);
                                    }else{
                                        res.send('0');
                                    }
                                },
                                function (error) {
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )

    }

    function getUser(req, res) {
        var query = req.query;
        if(query.username && query.password){
            findUserByCredentials(req, res);
        }else if(query.username){
            findUserByUserName(req, res);
        }
    }

    function findUserByUserName(req, res){
        var username = req.query.username;
        model
            .userModelPL
            .findUserByUsername(username)
            .then(
                function (users) {
                    if(users) {
                        res.send(users[0]);
                    }else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModelPL
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user){
                        res.send(user);
                    }else{
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getUserById(req, res){
        var userId = req.params.userId;
        model
            .userModelPL
            .findUserById(userId)
            .then(
                function (user) {
                    if(user) {
                        res.send(user);
                    }else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllUsersPokemons(req, res) {
        model
            .userModelPL
            .findAllUsersPokemons()
            .then(
                function (users) {
                    if(users) {
                        res.send(users);
                    }else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        model
            .userModelPL
            .updateUser(userId, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model
            .userModelPL
            .deleteUser(userId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};