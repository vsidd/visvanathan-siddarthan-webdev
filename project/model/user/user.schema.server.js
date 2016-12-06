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
        phone : String,
        // websites : [{type: mongoose.Schema.ObjectId, ref:'WebsiteModel'}],
        dateCreated : {type: Date, default: Date.now},
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "pmUser"});
    return UserSchema;
};