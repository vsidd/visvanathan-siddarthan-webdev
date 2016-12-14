/**
 * Created by Siddarthan on 03-Dec-16.
 */

module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModelPL = mongoose.model("UserModelPL", UserSchema);

    var api = {
        createUser : createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser,
        setModel : setModel,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        findAllUsersPokemons : findAllUsersPokemons,
        findAllUsers : findAllUsers,
        addComment : addComment,
        updateFollowingUser : updateFollowingUser,
        removeFollowingUser : removeFollowingUser
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findUserByFacebookId(facebookId) {
        return UserModelPL.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModelPL.findOne({'google.id': googleId});
    }

    function createUser(user){
        return UserModelPL.create(user);
    }

    function findUserById(userId) {
        return UserModelPL
            .findById(userId)
            .populate("pokemons","name")
            .exec();
    }

    function findAllUsersPokemons() {
        return UserModelPL
            .find()
            .populate("pokemons","name")
            .exec();
    }

    function findAllUsers() {
        return UserModelPL.find();
    }
    function findUserByUsername(username) {
        return UserModelPL.findOne({
            username: username
        })
    }

    function findUserByCredentials(username, password) {
        return UserModelPL.findOne({
            username: username,
            password: password
        })
    }
    
    function addComment(userId, comment) {
        return UserModelPL
            .findById(userId)
            .then(function (userObj) {
                userObj.comments.push(comment);
                userObj.save();
                return userObj;
            },function (err) {
                console.log(err);
            })
    }

    function updateFollowingUser(userIdToAdd, userId2) {
        return UserModelPL
            .findById(userId2)
            .then(function (userObj) {
                var following = userObj.following;
                if(following.indexOf(userIdToAdd.userId) === -1){
                    userObj.following.push(userIdToAdd.userId);
                }
                userObj.save();
                return userObj;
            }, function (err) {
                console.log(err)
            })
    }

    function removeFollowingUser(userIdToRemove, userId2) {
        return UserModelPL
            .findById(userId2)
            .then(function (userObj) {
                var following = userObj.following;
                if(following.indexOf(userIdToRemove.userId) != -1){
                    following.splice(following.indexOf(userIdToRemove.userId), 1);
                }
                userObj.following = following;
                userObj.save();
                return userObj;
            }, function (err) {
                console.log(err)
            })
    }

    function updateUser(userId, user) {
        return UserModelPL
            .update(
                {
                    _id : userId
                },
                {
                    $set : user
                }
            );
    }

    function deleteUser(userId) { //TODO: delete from other tables as well
        return UserModelPL
            .remove(
                {
                    _id : userId
                });
    }
}