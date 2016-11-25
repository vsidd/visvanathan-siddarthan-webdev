/**
 * Created by Siddarthan on 15-Nov-16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser : createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        // findAllWebsitesForUser : findAllWebsitesForUser,
        updateUser : updateUser,
        deleteUser : deleteUser,
        setModel : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    // function findAllWebsitesForUser(userId){
    //     return UserModel
    //         .findById(userId)
    //         .populate("websites")
    //         .exec();
    // }

    function createUser(user){
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({
            username: username
        })
    }
    
    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        })
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id : userId
                },
                {
                    username : user.username,
                    firstName : user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            );
    }

    function deleteUser(userId) {
        return UserModel
            .remove(
                {
                    _id : userId
                });
    }
}