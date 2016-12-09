/**
 * Created by Siddarthan on 07-Dec-16.
 */
(function () {
    angular
        .module("PokemonLocator")
        .controller("AddMapController", AddMapController)
        .controller("ListMapController", ListMapController);

    function AddMapController($location, UserService, $routeParams, LocationService) {
        var vm = this;
        var userId = $routeParams.uid;
        var pokemonId = $routeParams.pid;
        // vm.login = login;

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var labelIndex = 0;

        function initMap() {
            var neu = {lat: 42.340245, lng: -71.088354};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: neu
            });
            var geocoder = new google.maps.Geocoder;

            google.maps.event
                .addListener(map, 'click',
                    function(event) {
                        addMarker(event.latLng, geocoder, map);
                    });

            // Add a marker at the center of the map.
            // addMarker(neu, map);


        }
        initMap();

        function addMarker(location, geocoder, map) {
            // Add the marker at the clicked location, and add the next-available label
            // from the array of alphabetical characters.
            var marker = new google.maps.Marker({
                position: location,
                label: labels[labelIndex++ % labels.length],
                map: map
            });
            getAddress(geocoder, location, marker);
        }

        function getAddress(geocoder, location, marker){
            geocoder
                .geocode(
                    {'location': location},
                    function(results, status) {
                        if (status === 'OK') {
                            console.log(results[1].formatted_address);
                            saveLocation(results[1].formatted_address, location, marker);
                        }
                    });
        }

        function saveLocation(address, location, marker) {
            var locationObj = {};
            locationObj.coordinates = location;
            locationObj.userId = userId;
            // locationObj.pokemonId = marker.label;
            var pokemonId = marker.label;
            locationObj.address = address;
            LocationService
                .saveLocation(userId, locationObj, pokemonId)
                .success(function (savedLocationObj) {
                    console.log(savedLocationObj);
                })
                .error(function (err) {
                    console.log(err);
                })
        }
    }

    function ListMapController($location, UserService, $routeParams, LocationService) {
        var vm = this;
        var userId = $routeParams.uid;
        // vm.login = login;

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var labelIndex = 0;

        function initMap() {
            var neu = {lat: 42.340245, lng: -71.088354};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: neu
            });
            var geocoder = new google.maps.Geocoder;

            google.maps.event
                .addListener(map, 'click',
                    function(event) {
                        addMarker(event.latLng, geocoder, map);
                    });

            // Add a marker at the center of the map.
            // addMarker(neu, map);


        }
        initMap();

        function addMarker(location, geocoder, map) {
            // Add the marker at the clicked location, and add the next-available label
            // from the array of alphabetical characters.
            var marker = new google.maps.Marker({
                position: location,
                label: labels[labelIndex++ % labels.length],
                map: map
            });
            getAddress(geocoder, location, marker);
        }

        function getAddress(geocoder, location, marker){
            geocoder
                .geocode(
                    {'location': location},
                    function(results, status) {
                        if (status === 'OK') {
                            console.log(results[1].formatted_address);
                            saveLocation(results[1].formatted_address, location, marker);
                        }
                    });
        }

        function saveLocation(address, location, marker) {
            var locationObj = {};
            locationObj.coordinates = location;
            locationObj.userId = userId;
            locationObj.pokemonId = marker.label;
            locationObj.address = address;
            LocationService
                .saveLocation(userId, locationObj)
                .success(function (savedLocationObj) {
                    console.log(savedLocationObj);
                })
                .error(function (err) {
                    console.log(err);
                })
        }
    }

})();