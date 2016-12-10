/**
 * Created by Siddarthan on 09-Dec-16.
 */

(function () {
    angular
        .module("PokemonLocator")
        .factory("PokemonService", PokemonService);

    function PokemonService($http) {
        var api = {

            "findAllPokemon" : findAllPokemon
            // "saveLocation" : saveLocation,
            // "findLocationByUserId" : findLocationByUserId,
            // "findLocationById" : findLocationById,
            // // "findLocationByPokemonId" : findLocationByPokemonId,
            // "updateLocation" : updateLocation,
            // "deleteLocation" : deleteLocation
        };

        return api;


        function findAllPokemon(){
            var url = "/api/project/pokemon/";
            return $http.get(url);
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