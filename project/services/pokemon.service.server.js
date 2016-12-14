/**
 * Created by Siddarthan on 09-Dec-16.
 */

module.exports = function (app, model) {

    // app.post("/api/project/user/:userId/:pid/location", saveLocation);
    // app.get("/api/project/user/:userId/location", findAllLocationsForUser);
    app.post("/api/project/pokemon", createPokemon);
    app.get("/api/project/pokemon/", findAllPokemon);
    app.get("/api/project/pokemon/id/:pokemonId", findPokemonById);
    app.get("/api/project/pokemon/number/:pokemonNumber", findPokemonByNumber);
    // app.put("/api/project/pokemon/:userId/:pid/location", insertLocation);
    app.put("/api/project/pokemon/:userId/:pid/", insertUser);
    app.post("/api/project/pokemon/comment/:pid", addComment)
    app.put("/api/project/pokemon/:pokemonId", updatePokemon);
    app.delete("/api/project/pokemon/:pokemonId", deletePokemon);


    function createPokemon(req, res) {
        var pokemon = req.body;
        model
            .pokemonModel
            .findPokemonById(pokemon._id)
            .then(function (retrivedPokemon) {
                if(retrivedPokemon){
                    res.send('0');
                }else{
                    model
                        .pokemonModel
                        .createPokemon(pokemon)
                        .then(function (newPokemon) {
                            if(newPokemon){
                                res.send(newPokemon);
                            }else{
                                res.send('0');
                            }
                        }, function (error) {
                            console.log(error);
                            res.sendStatus(400).send(error);
                        })
                }
            }, function (error) {
                console.log(error);
                res.sendStatus(400).send(error);
            })
    }

    function findAllPokemon(req, res) {
        model
            .pokemonModel
            .findAllPokemon()
            .then(
                function (pokemonList) {
                    if(pokemonList){
                        res.send(pokemonList)
                    }else{
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findPokemonById(req, res) {
        var pokemonId = req.params.pokemonId;
        model
            .pokemonModel
            .findPokemonById(pokemonId)
            .then(
                function (pokemon) {
                    if(pokemon){
                        res.send(pokemon);
                    }else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findPokemonByNumber(req, res) {
        var pokemonNumber = req.params.pokemonNumber;
        model
            .pokemonModel
            .findPokemonByNumber(pokemonNumber)
            .then(
                function (pokemon) {
                    if(pokemon){
                        res.send(pokemon);
                    }else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }


    function addComment(req, res) {
        var pokemonId = req.params.pid;
        var comment = req.body;
        model
            .pokemonModel
            .addComment(pokemonId, comment)
            .then(function (status) {
                res.send(200);
            },
            function (err) {
                console.log(err);
                res.sendStatus(400).send(error);
            })
    }
    function insertUser(req, res) {
        var userId = req.params.userId;
        var pokemonId = req.params.pid;
        model
            .pokemonModel
            .insertUser(userId, pokemonId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }


    function updatePokemon(req, res) {
        var pokemonId = req.params.pokemonId;
        var pokemon = req.body;
        model
            .pokemonModel
            .updatePokemon(pokemonId, pokemon)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                console.log(error)
                res.sendStatus(400).send(error);
            })
    }

    function deletePokemon(req, res) {
        var pokemonId = req.params.pokemonId;
        model
            .pokemonModel
            .deletePokemon(pokemonId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.sendStatus(400).send(error);
            })
    }
};