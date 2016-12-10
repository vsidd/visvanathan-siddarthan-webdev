/**
 * Created by Siddarthan on 09-Dec-16.
 */

module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PokemonSchema = require("./pokemon.schema.server.js")();
    var PokemonModel = mongoose.model("PokemonModel", PokemonSchema);

    var pokemonList = require("./pokemon.json")[0];
    init();
    var api = {
        // createLocationForUser : createLocationForUser,
        // findAllLocationsForUser : findAllLocationsForUser,
        findPokemonById : findPokemonById,
        findPokemonByNumber : findPokemonByNumber,
        insertUser : insertUser,
        findAllPokemon : findAllPokemon,
        // updateLocation : updateLocation,
        // deleteLocation : deleteLocation,
        setModel : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function init() {
        for(var pokemonNumber in pokemonList){
            var record = pokemonList[pokemonNumber];
            var query = {"pokemonNumber" : pokemonNumber};
            var upsertValue = {
                pokemonNumber : pokemonNumber,
                name : record.name,
                attack: record.attack,
                defense:record.defense,
                type: record.type,
                moves:record.moves,
                // users:[],
                // locations:[],
            }
            PokemonModel.findOneAndUpdate(query, upsertValue, {upsert:true},
            function (err, doc) {
                // console.log(err);
                // console.log(doc);
            });
        }
    }


    // function createLocationForUser(userId, location, pokemonId) {//TODO: only by admin
    //     location._user = userId;
    //     location._pokemon = pokemonId;
    //     return PokemonModel
    //         .create(location)
    //         .then(function (locationObj) {
    //             model.userModelPL
    //                 .findUserById(userId)
    //                 .then(function (userObj) {
    //                     userObj.locations.push(locationObj);
    //                     userObj.save();
    //                 });
    //             return locationObj;
    //         });
    // }


    function findAllPokemon() {
        return PokemonModel
            .find()
            .populate("locations","coordinates")
            .exec();
    }
    function findPokemonById(pokemonId) {
        return PokemonModel.findById(pokemonId);
    }

    function findPokemonByNumber(pokemonNumber) {
        return PokemonModel.findOne({
            pokemonNumber : pokemonNumber
        });
    }

    function insertUser(userId, pokemonId) {
      return PokemonModel
            .findPokemonById(pokemonId)
            .then(
                function (pokemonObj) {
                    if(pokemonObj){
                        model
                            .userModelPL
                            .findUserById(userId)
                            .then(
                                function (userObj) {
                                    if(userObj){
                                        pokemonObj.users.push(userObj);
                                        pokemonObj.save();
                                        // res.sendStatus(200);
                                    }else {
                                        res.send('0');
                                    }
                                }
                            )
                    }
                    return pokemonObj;
                }
            )
    }


    // function updateLocation(locationId, location) {
    //     return PokemonModel
    //         .update(
    //             {
    //                 _id : locationId
    //             },
    //             {
    //                 $set : location
    //             }
    //         )
    // }


    // function updateLocation(locationId, location) {
    //     return PokemonModel
    //         .update(
    //             {
    //                 _id : locationId
    //             },
    //             {
    //                 $set : location
    //             }
    //         )
    // }
    //
    // function deleteLocation(locationId) {
    //     return PokemonModel
    //         .remove(
    //             {
    //                 _id : locationId
    //             });
    // }
}