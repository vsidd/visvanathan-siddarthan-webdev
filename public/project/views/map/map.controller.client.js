/**
 * Created by Siddarthan on 07-Dec-16.
 */
(function () {
    angular
        .module("PokemonLocator")
        .controller("AddMapController", AddMapController)
        .controller("ListMapController", ListMapController)
        .controller("MyListMapController", MyListMapController)
        .controller("MyDeleteMapController", MyDeleteMapController);

    function AddMapController($location, UserService, $routeParams, LocationService, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;
        var pokemonId = $routeParams.pid;
        vm.logout = logout;
        vm.userprofile = userprofile;
        vm.goToMyMap = goToMyMap;
        vm.goToGlobalMap = goToGlobalMap;
        // vm.login = login;

        // var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // var labelIndex = 0;

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
            var image = {
                url: "./images/gen1/"+pokemonId+".png", // image is 512 x 512
                scaledSize : new google.maps.Size(43, 43)
            };
            var marker = new google.maps.Marker({
                position: location,
                // label: pokemonId,
                map: map,
                icon: image
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
            // locationObj.userId = userId;
            // locationObj.pokemonId = marker.label;
            // var pokemonId = marker.label;
            locationObj.address = address;
            LocationService
                .saveLocation(userId, locationObj, pokemonId)
                .success(function (savedLocationObj) {
                    // console.log(savedLocationObj);
                    $location.url("/user/"+userId+"/map");
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $rootScope.currentUser = null;
                    $rootScope.currentUserSignedIn = false;
                    $location.url("/home");
                })
                .error(function (error) {

                })
        }

        function goToMyMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/mymap");
            }else{
                return false;
            }
        }

        function goToGlobalMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/map");
            }else{
                return false;
            }
        }

        function userprofile() {
            $location.url("/user/"+$rootScope.currentUser._id+"/profile/");
        }
    }

    function ListMapController($location, UserService, $routeParams, LocationService, PokemonService, $rootScope) {
        var vm = this;
        vm.addSelectedPokemon = addSelectedPokemon;
        var userId = $routeParams.uid;
        vm.userId = userId;
        vm.logout = logout;
        vm.goToMyMap = goToMyMap;
        vm.goToGlobalMap = goToGlobalMap;
        vm.userprofile = userprofile;
        // vm.pokemonList=[];

        function initMap() {
            var neu = {lat: 42.340245, lng: -71.088354};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: neu
            });
            listCaughtPokemon(map);
        }
        initMap();

        function listCaughtPokemon(map) {
            PokemonService
                .findAllPokemon()
                .success(function (pokemonList) {
                    vm.pokemonList = pokemonList;
                    // console.log(pokemonList);
                    if(pokemonList && pokemonList != '0'){
                        for(var i = 0; i < pokemonList.length; i++){
                            var pokemon = pokemonList[i];
                            if(pokemon.locations.length!=0){
                                var locations = pokemon.locations;
                                for(var j = 0; j < locations.length;j++){
                                    var image = {
                                        url: "./images/gen1/"+pokemon.pokemonNumber+".png", // image is 512 x 512
                                        scaledSize : new google.maps.Size(43, 43)
                                    };
                                    var marker = new google.maps.Marker({
                                        position: locations[j].coordinates,
                                        // label : pokemon.pokemonNumber,
                                        animation: google.maps.Animation.DROP,
                                        map: map,
                                        icon: image
                                    });
                                }
                            }

                        }
                    }
                })
                .error(function (err) {

                })

        }

        function addSelectedPokemon(selectedPokemon) {

            if(selectedPokemon){
                $location.url("/user/"+userId+"/"+selectedPokemon.pokemonNumber+"/map");
            }
        }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $rootScope.currentUser = null;
                    $rootScope.currentUserSignedIn = false;
                    $location.url("/home");
                })
                .error(function (error) {

                })
        }

        function goToMyMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/mymap");
            }else{
                return false;
            }
        }

        function goToGlobalMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/map");
            }else{
                return false;
            }
        }

        function userprofile() {
            $location.url("/user/"+$rootScope.currentUser._id+"/profile/");
        }

    }


    function MyListMapController($location, UserService, $routeParams, LocationService, PokemonService, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.logout = logout;
        vm.goToGlobalMap = goToGlobalMap;
        vm.moveToDeletePage = moveToDeletePage;
        vm.userprofile = userprofile;
        vm.goToMyMap = goToMyMap;
        // vm.markerList = [];

        function initMap() {
            var neu = {lat: 42.340245, lng: -71.088354};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: neu
            });
            listMyCaughtPokemon(map);
        }
        initMap();

        function listMyCaughtPokemon(map) {
            // vm.markerList = [];
            LocationService
                .findLocationByUserId(userId)
                .success(function (locationList) {
                    vm.locationList = locationList;
                    // console.log(pokemonList);
                    if(locationList && locationList != '0'){
                        for(var i = 0; i < locationList.length; i++){
                            var location = locationList[i];
                            var pokemon = location._pokemon;
                            var image = {
                                url: "./images/gen1/"+pokemon.pokemonNumber+".png", // image is 512 x 512
                                scaledSize : new google.maps.Size(43, 43)
                            };
                            var marker = new google.maps.Marker({
                                position: location.coordinates,
                                // label : pokemon.pokemonNumber,
                                animation: google.maps.Animation.DROP,
                                map: map,
                                icon: image
                            });
                            // vm.markerList.push(marker);
                        }
                    }
                })
                .error(function (err) {

                })

        }


        function logout() {
            UserService
                .logout()
                .success(function () {
                    $rootScope.currentUser = null;
                    $rootScope.currentUserSignedIn = false;
                    $location.url("/home");
                })
                .error(function (error) {

                })
        }

        function goToGlobalMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/map");
            }else{
                return false;
            }
        }

        function goToMyMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/mymap");
            }else{
                return false;
            }
        }

        function moveToDeletePage() {
            $location.url("/user/"+$rootScope.currentUser._id+"/mymap/delete");
        }

        function userprofile() {
            $location.url("/user/"+$rootScope.currentUser._id+"/profile/");
        }

    }


    function MyDeleteMapController($location, UserService, $routeParams, LocationService, PokemonService, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.logout = logout;
        vm.goToGlobalMap = goToGlobalMap;
        vm.goToMyMap = goToMyMap;
        vm.userprofile = userprofile;
        vm.markerList = {};

        function initMap() {
            var neu = {lat: 42.340245, lng: -71.088354};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: neu
            });
            listMyCaughtPokemon(map);
        }
        initMap();

        function listMyCaughtPokemon(map) {
            vm.markerList = {};
            LocationService
                .findLocationByUserId(userId)
                .success(function (locationList) {
                    vm.locationList = locationList;
                    // console.log(pokemonList);
                    if(locationList && locationList != '0'){
                        for(var i = 0; i < locationList.length; i++){
                            var location = locationList[i];
                            var pokemon = location._pokemon;
                            var uniqueId = location.coordinates.lat+'_'+location.coordinates.lng;
                            var image = {
                                url: "./images/gen1/"+pokemon.pokemonNumber+".png", // image is 512 x 512
                                scaledSize : new google.maps.Size(43, 43)
                            };
                            var marker = new google.maps.Marker({
                                position: location.coordinates,
                                // label : pokemon.pokemonNumber,
                                animation: google.maps.Animation.DROP,
                                map: map,
                                id: uniqueId,
                                icon: image
                            });
                            vm.markerList[uniqueId]=marker;
                            bindMarkerEvents(marker);
                            // marker.addListener('click', toggleBounce(marker));
                        }
                    }
                })
                .error(function (err) {

                })
        }

        function bindMarkerEvents(marker) {
            google.maps.event.addListener(marker, "click", function (point) {
                var markerId = point.latLng.lat()+'_'+point.latLng.lng(); // get marker id by using clicked point's coordinate
                var marker = vm.markerList[markerId]; // find marker
                toggleBounce(marker, markerId); // remove it
            });
        };

        function toggleBounce(marker, markerId) {
            if (marker.getAnimation() !== null) {
                deleteMarker(marker,markerId);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                //TODO: add pop-up to confirm deletion - MAP info window
            }
        }
        
        function deleteMarker(marker, markerId) {
            // console.log(marker);
            // for(var i=0; i <  vm.markerList.length; i++){
            //     var marker = vm.markerList[i];
                if(marker.getAnimation() !== null){
                    for(var j = 0; j < vm.locationList.length; j++){
                        var location = vm.locationList[j];
                        var markerCoordinates = marker.getPosition();
                        var locationCoordinates = location.coordinates;
                        if((markerCoordinates.lat() == locationCoordinates.lat)&&
                            (markerCoordinates.lng() == locationCoordinates.lng)){
                            // console.log(markerCoordinates.lat());
                            // console.log(locationCoordinates.lat);
                            // console.log(markerCoordinates.lng());
                            // console.log(locationCoordinates.lng);
                            marker.setAnimation(null);
                            marker.setMap(null);
                            LocationService.deleteLocation(location._id);
                        }
                    }
                // }
            }

        }


        function logout() {
            UserService
                .logout()
                .success(function () {
                    $rootScope.currentUser = null;
                    $rootScope.currentUserSignedIn = false;
                    $location.url("/home");
                })
                .error(function (error) {

                })
        }

        function goToGlobalMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/map");
            }else{
                return false;
            }
        }

        function goToMyMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/mymap");
            }else{
                return false;
            }
        }

        function userprofile() {
            $location.url("/user/"+$rootScope.currentUser._id+"/profile/");
        }

    }

})();