/**
 * Created by Siddarthan on 15-Nov-16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage : updatePage,
        deletePage : deletePage
    };
    return api;

    function createPage(websiteId, page) {

    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({
            _website : websiteId
        })
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, page) {

    }

    function deletePage(pageId) {
        return PageModel
            .remove(
                {
                    _id : pageId
                });
    }
}