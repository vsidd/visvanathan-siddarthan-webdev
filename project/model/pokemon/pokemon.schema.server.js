/**
 * Created by Siddarthan on 09-Dec-16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var PokemonSchema = mongoose.Schema({
        pokemonNumber : String,
        name : String,
        attack: Number,
        defense:Number,
        type: String,
        moves:[{type: String}],
        users : [{type: mongoose.Schema.ObjectId, ref:'UserModelPL'}],
        locations : [{type: mongoose.Schema.ObjectId, ref:'LocationModel'}],
        dateCreated : {type : Date, default : Date.now}
    }, {collection: "pokemon"});
    return PokemonSchema;
};