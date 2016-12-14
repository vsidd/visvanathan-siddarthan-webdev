/**
 * Created by Siddarthan on 07-Dec-16.
 */

module.exports = function (app, model) {

    app.post("/api/project/user/:userId/:pid/location", saveLocation);
    app.get("/api/project/user/:userId/location", findAllLocationsForUser);
    app.get("/api/project/location/:locationId", findLocationById);
    app.get("/api/project/location/", findAllLocation);
    app.put("/api/project/location/:locationId", updateLocation);
    app.delete("/api/project/location/:locationId", deleteLocation);

    function saveLocation(req, res) {
        var location = req.body;
        var userId = req.params.userId;
        var pokemonId = req.params.pid;
        model
            .locationModel
            .createLocationForUser(userId, location, pokemonId)
            .then(
                function (newLocation) {
                    res.send(newLocation);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findAllLocationsForUser(req, res) {
        var userId = req.params.userId;
        model
            .locationModel
            .findAllLocationsForUser(userId)
            .then(
                function (locations) {
                    res.send(locations);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findLocationById(req, res) {
        var locationId = req.params.locationId;
        model
            .locationModel
            .findLocationById(locationId)
            .then(
                function (location) {
                    if(location){
                        res.send(location);
                    }else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findAllLocation(req, res) {
        model
            .locationModel
            .findAllLocation()
            .then(
                function (locations) {
                    if(locations){
                        res.send(locations);
                    }else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateLocation(req, res) {
        var location = req.body;
        var locationId = req.params.locationId;
        model
            .locationModel
            .updateLocation(locationId, location)
            .then(
                function (status) {
                    res.send(200)
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function deleteLocation(req, res) {
        var locationId = req.params.locationId;
        model.locationModel
            .deleteLocationReference(locationId)
            .then(function (status) {
                    model.locationModel
                        .deleteLocation(locationId)
                        .then(function (status) {
                            res.send(200);
                        })
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            )
    }
};