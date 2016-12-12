/**
 * Created by Siddarthan on 07-Dec-16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var LocationSchema = mongoose.Schema({
        _user : [{type: mongoose.Schema.ObjectId, ref:'UserModelPL'}],
        _pokemon : [{type: mongoose.Schema.ObjectId, ref:'PokemonModel'}],
        // _pokemon : String,
        coordinates : { lat: Number, lng: Number },
        address : String,
        dateCreated : {type : Date, default : Date.now}
    }, {collection: "location"});
    return LocationSchema;
};