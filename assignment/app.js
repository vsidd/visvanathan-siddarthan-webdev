/**
 * Created by Siddarthan on 26-Oct-16.
 */
module.exports = function(app) {
    var model = require("./model/model.server.js")(app);
    require("./services/user.service.server.js")(app, model);
    require("./services/website.service.server.js")(app, model);
    require("./services/page.service.server.js")(app, model);
    require("./services/widget.service.server.js")(app, model);
};