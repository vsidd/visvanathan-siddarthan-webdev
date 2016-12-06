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
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findUserByFacebookId(facebookId) {
        return UserModelPL.findOne({'facebook.id': facebookId});
    }

    function createUser(user){
        return UserModelPL.create(user);
    }

    function findUserById(userId) {
        return UserModelPL.findById(userId);
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

    function deleteUser(userId) {
        return UserModelPL
            .remove(
                {
                    _id : userId
                });
    }
}