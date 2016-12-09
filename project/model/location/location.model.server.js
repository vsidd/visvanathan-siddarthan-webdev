/**
 * Created by Siddarthan on 07-Dec-16.
 */

module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var LocationSchema = require("./location.schema.server.js")();
    var LocationModel = mongoose.model("LocationModel", LocationSchema);

    var api = {
        createLocationForUser : createLocationForUser,
        findAllLocationsForUser : findAllLocationsForUser,
        findLocationById : findLocationById,
        updateLocation : updateLocation,
        deleteLocation : deleteLocation,
        setModel : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createLocationForUser(userId, location, pokemonId) {
        location._user = userId;
        location._pokemon = pokemonId;
        return LocationModel
            .create(location)
            .then(function (locationObj) {
                model.userModelPL
                    .findUserById(userId)
                    .then(function (userObj) {
                        userObj.locations.push(locationObj);
                        userObj.save();
                    });
                return locationObj;
            });
    }

    function findAllLocationsForUser(userId) {
        return LocationModel.find({
            _user : userId
        })
    }
    // function findAllWebsitesForUser(userId) {
    //     return model.userModel.findAllWebsitesForUser(userId);
    // }

    function findLocationById(locationId) {
        return LocationModel.findById(locationId);
    }

    function updateLocation(locationId, location) {
        return LocationModel
            .update(
                {
                    _id : locationId
                },
                {
                    $set : location
                }
            )
    }

    function deleteLocation(locationId) {
        return LocationModel
            .remove(
                {
                    _id : locationId
                });
    }
}