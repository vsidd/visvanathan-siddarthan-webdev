/**
 * Created by Siddarthan on 15-Nov-16.
 */
module.exports = function () {
    // var mongoose = require('mongoose');
    // mongoose.createConnection('mongodb://localhost/webdev-assignment-db');


    var connectionString = 'mongodb://heroku_2kf5s1tp:d90a6e4kc0cmta7ei7a3mlftse@ds033056.mlab.com:33056/heroku_2kf5s1tp';
    // var connectionString = 'mongodb://127.0.0.1:27017/webdev-assignment-db';
    // if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    //     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    //         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    //         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    //         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    //         process.env.OPENSHIFT_APP_NAME;
    // }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);


    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();

    var model = {
        userModel : userModel,
        websiteModel : websiteModel,
        pageModel : pageModel,
        widgetModel : widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};