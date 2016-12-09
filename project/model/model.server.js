/**
 * Created by Siddarthan on 03-Dec-16.
 */

module.exports = function () {
    // var connectionString = 'mongodb://heroku_2kf5s1tp:d90a6e4kc0cmta7ei7a3mlftse@ds033056.mlab.com:33056/heroku_2kf5s1tp';
    var connectionString = 'mongodb://127.0.0.1:27017/webdev-project-db';

    var mongoose = require("mongoose");
    // mongoose.connect(connectionString);


    var userModelPL = require("./user/user.model.server.js")();
    var locationModel = require("./location/location.model.server.js")();

    var model = {
        userModelPL : userModelPL,
        locationModel: locationModel
    };

    userModelPL.setModel(model);
    locationModel.setModel(model);

    return model;
};