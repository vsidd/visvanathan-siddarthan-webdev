/**
 * Created by Siddarthan on 15-Nov-16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsiteForUser : createWebsiteForUser,
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite,
        setModel : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return WebsiteModel
            .create(website)
            .then(function (websiteObj) {
                model.userModel
                    .findUserById(userId)
                    .then(function (userObj) {
                        userObj.websites.push(websiteObj);
                        userObj.save();
                    });
                return websiteObj;
            });
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({
            _user : userId
        })
    }
    // function findAllWebsitesForUser(userId) {
    //     return model.userModel.findAllWebsitesForUser(userId);
    // }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel
            .update(
                {
                    _id : websiteId
                },
                {
                    $set : website
                }
            )
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel
            .remove(
                {
                    _id : websiteId
                });
    }
}