/**
 * Created by Siddarthan on 03-Dec-16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username : String,
        password : String,
        firstName : String,
        lastName : String,
        email : String,
        role : {type: String, default: "user"},
        // phone : String,
        locations : [{type: mongoose.Schema.ObjectId, ref:'LocationModel'}],
        pokemons : [{type: mongoose.Schema.ObjectId, ref:'PokemonModel'}],
        dateCreated : {type: Date, default: Date.now},
        comments : [{username : String, comment: String, today: String}],
        following : [String],
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "pmUser"});
    return UserSchema;
};