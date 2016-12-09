/**
 * Created by Siddarthan on 03-Dec-16.
 */

module.exports = function(app) {
    var model = require("./model/model.server.js")(app);
    require("./services/user.service.server.js")(app, model);
    require("./services/location.service.server.js")(app, model);
};