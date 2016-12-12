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
        deleteLocationReference : deleteLocationReference,
        deleteLocation : deleteLocation,
        setModel : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createLocationForUser(userId, location, pokemonId) {
        location._user = userId;
        // location._pokemon = pokemonId;

        return LocationModel
            .create(location)
            .then(function (locationObj) {
                model.userModelPL
                    .findUserById(userId)
                    .then(function (userObj) {
                        model.pokemonModel
                            .findPokemonByNumber(pokemonId)
                            .then(function (pokemonObj) {
                                locationObj._pokemon.push(pokemonObj._id);
                                locationObj.save();
                                pokemonObj.locations.push(locationObj);
                                pokemonObj.users.push(userObj);
                                pokemonObj.save();
                                userObj.locations.push(locationObj);
                                userObj.pokemons.push(pokemonObj);
                                userObj.save();
                            });
                    });


                return locationObj;
            });
    }

    function findAllLocationsForUser(userId) {
        return LocationModel.find({
            _user : userId
        })
            .populate("_pokemon","pokemonNumber")
            .exec();
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

    function deleteLocationReference(locationId) {
        return LocationModel
            .findById(locationId)
            .then(function (locationObj) {
                console.log(locationObj);
                console.log(locationObj._user[0]);
               model.userModelPL
                    .findUserById(locationObj._user[0])
                    .then(function (userObj) {
                        model.pokemonModel
                            .findPokemonById(locationObj._pokemon[0])
                            .then(function (pokemonObj) {
                                var locationIndexInUser = userObj.locations.indexOf(locationObj._id);
                                var locationIndexInPokemon = pokemonObj.locations.indexOf(locationObj._id);
                                var pokemonIndexInUser = userObj.pokemons.indexOf(pokemonObj._id);
                                var userIndexInPokemon = pokemonObj.users.indexOf(userObj._id);

                                if(locationIndexInUser > -1){
                                    userObj.locations.splice(locationIndexInUser, 1);
                                    userObj.save();
                                }
                                if(locationIndexInPokemon > -1){
                                    pokemonObj.locations.splice(locationIndexInPokemon, 1);
                                    pokemonObj.save();
                                }
                                if(pokemonIndexInUser > -1){
                                    userObj.pokemons.splice(pokemonIndexInUser, 1);
                                    userObj.save();
                                }
                                if(userIndexInPokemon > -1){
                                    pokemonObj.users.splice(userIndexInPokemon, 1);
                                    pokemonObj.save();
                                }
                            })
                    })
                return locationObj;
            })
    }

    function deleteLocation(locationId) {
        return LocationModel
            .remove(
                {
                    _id : locationId
                });
    }
}