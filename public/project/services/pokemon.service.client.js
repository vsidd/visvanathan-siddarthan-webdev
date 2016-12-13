/**
 * Created by Siddarthan on 09-Dec-16.
 */

(function () {
    angular
        .module("PokemonLocator")
        .factory("PokemonService", PokemonService);

    function PokemonService($http) {
        var api = {

            "findAllPokemon" : findAllPokemon,
            "findFromPokeApi" : findFromPokeApi,
            "findPokemonByNumber" : findPokemonByNumber,
            "addComment" : addComment,
            "createPokemon" : createPokemon
            // "findPokemonById" : findPokemonById
            // "saveLocation" : saveLocation,
            // "findLocationByUserId" : findLocationByUserId,
            // "findLocationById" : findLocationById,
            // // "findLocationByPokemonId" : findLocationByPokemonId,
            // "updateLocation" : updateLocation,
            // "deleteLocation" : deleteLocation
        };

        return api;


        function createPokemon(pokemon) {
            var url = "/api/project/pokemon";
            return $http.post(url, pokemon);
        }

        function findAllPokemon(){
            var url = "/api/project/pokemon/";
            return $http.get(url);
        }

        function findFromPokeApi(pokemonNumber) {
            var url = "http://pokeapi.co/api/v2/pokemon/"+pokemonNumber+"/"
            return $http.get(url);
        }

        function findPokemonByNumber(pokemonNumber) {
            var url = "/api/project/pokemon/number/"+pokemonNumber;
            return $http.get(url);
        }

        function addComment(pokemonId, comment) {
            var url = "/api/project/pokemon/comment/"+pokemonId;
            return $http.post(url, comment);
        }

        // function updateLocation(locationId, location) {
        //     var url = "/api/project/location/"+locationId;
        //     return $http.put(url, location);
        // }
        //
        // function deleteLocation(locationId) {
        //     var url = "/api/project/location/"+locationId;
        //     return $http.delete(url);
        // }
    }
})();