/**
 * Created by Siddarthan on 07-Dec-16.
 */

module.exports = function (app, model) {
    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "developerId": "456",  "description": ""},
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456",  "description": "" },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456",  "description": "" },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123",  "description": "" },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123",  "description": "" },
    //     { "_id": "789", "name": "Chess",       "developerId": "234",  "description": "" }
    // ];

    app.post("/api/project/user/:userId/:pid/location", saveLocation);
    app.get("/api/project/user/:userId/location", findAllLocationsForUser);
    app.get("/api/project/location/:locationId", findLocationById);
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