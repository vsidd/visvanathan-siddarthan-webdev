/**
 * Created by Siddarthan on 26-Oct-16.
 */
module.exports = function (app, model) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var auth = authorized;
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



    app.post("/api/user", createUser);
    app.get("/api/user", getUser);
    app.get("/api/user/:userId", getUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.post('/api/checkLoggedin', checkLoggedin);

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user/',
            failureRedirect: '/assignment/index.html#/login/'
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
            .userModel
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
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        if (user.username === username && bcrypt.compareSync(password, user.password)) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    }else{
                        return done(null, false);
                    }
                },
                function(err) {
                     return done(err);
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if(user){
                        return done(null,user);
                    }else{
                        var displayName = profile.displayName.split(" ");
                        var username = displayName[0]+"_"+displayName[1];
                        var firstName = displayName[0];
                        var lastName = displayName[1];
                        var newFacebookUser = {
                            username: username,
                            firstName: firstName,
                            lastName: lastName,
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
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
            .userModel
            .findUserByUsername(user.username)
            .then(
                function (retrivedUser) {
                    if(retrivedUser){
                        res.send('0');
                    }else{
                        model
                            .userModel
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
            .userModel
            .findUserByUsername(user.username)
            .then(
                function (retrivedUser) {
                    if(retrivedUser){
                        res.send('0');
                    }else{
                        model
                            .userModel
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
            .userModel
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
            .userModel
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
            .userModel
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

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        model
            .userModel
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
            .userModel
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