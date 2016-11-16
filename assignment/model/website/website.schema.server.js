/**
 * Created by Siddarthan on 15-Nov-16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        _user : {type: mongoose.Schema.ObjectId, ref:'UserModel'},
        name : String,
        description : String,
        pages : [{type: mongoose.Schema.ObjectId, ref:'PageModel'}],
        dateCreated : {type : Date, default : Date.now}
    }, {collection: "website"});
    return WebsiteSchema;
};