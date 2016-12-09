/**
 * Created by Siddarthan on 07-Dec-16.
 */


(function () {
    angular
        .module("PokemonLocator")
        .factory("LocationService", LocationService);

    function LocationService($http) {
        var api = {
            "saveLocation" : saveLocation,
            "findLocationByUserId" : findLocationByUserId,
            "findLocationById" : findLocationById,
            // "findLocationByPokemonId" : findLocationByPokemonId,
            "updateLocation" : updateLocation,
            "deleteLocation" : deleteLocation
        };

        return api;

        function saveLocation(userId, location, pokemonId) {
            var url = "/api/project/user/"+userId+"/"+pokemonId+"/location";
            return $http.post(url, location);
        }

        function findLocationByUserId(userId){
            var url = "/api/project/user/"+userId+"/location/";
            return $http.get(url);
        }

        function findLocationById(locationId){
            var url = "/api/project/location/"+locationId;
            return $http.get(url);
        }

        // function findLocationByPokemonId(pokemonId){
        //     var url = "/api/project/location/"+pokemonId;
        //     return $http.get(url);
        // }

        function updateLocation(locationId, location) {
            var url = "/api/project/location/"+locationId;
            return $http.put(url, location);
        }

        function deleteLocation(locationId) {
            var url = "/api/project/location/"+locationId;
            return $http.delete(url);
        }
    }
})();