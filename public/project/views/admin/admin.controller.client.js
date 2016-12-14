/**
 * Created by Siddarthan on 13-Dec-16.
 */

(function () {
    angular
        .module("PokemonLocator")
        .controller("AdminHomeController", AdminHomeController)
        .controller("AdminUserController", AdminUserController)
        .controller("AdminLocationController", AdminLocationController)
        .controller("AdminPokemonController", AdminPokemonController);

    function AdminHomeController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.logout = logout;
        vm.goToGlobalMap = goToGlobalMap;
        vm.goToMyMap = goToMyMap;
        vm.userprofile = userprofile;
        vm.searchPokemon = searchPokemon;
        vm.leaderboard = leaderboard;

        if(!userId){
            userId = $rootScope.currentUser._id;
        }

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if(user != '0' && user.role.toLowerCase()==="admin") {
                        vm.user = user;
                        $rootScope.currentUser = user;
                        $rootScope.currentUserSignedIn = true;
                    }else if(user != '0'){
                        $location.url("/user/"+user._id+"/profile/");
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();

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

        function searchPokemon() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/pokemon/search");
            }else{
                return false;
            }
        }

        function leaderboard() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/leaderboard");
            }else{
                return false;
            }
        }

    }

    function AdminUserController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.logout = logout;
        vm.goToGlobalMap = goToGlobalMap;
        vm.goToMyMap = goToMyMap;
        vm.userprofile = userprofile;
        vm.createUser = createUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.backToAdminList = backToAdminList;
        vm.searchPokemon = searchPokemon;
        vm.leaderboard = leaderboard;

        if(!userId){
            userId = $rootScope.currentUser._id;
        }

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if(user != '0' && user.role.toLowerCase()==="admin") {
                        vm.user = user;
                        $rootScope.currentUser = user;
                        $rootScope.currentUserSignedIn = true;
                        findAllUsers();
                    }else if(user != '0'){
                        $location.url("/user/"+user._id+"/profile/");
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();

        function createUser(newUser) {
            newUser._id = null;
            UserService
                .createUser(newUser)
                .success(function (newUserObj) {
                    vm.error ="";
                    if(newUserObj != '0') {
                        vm.newUser=""
                        findAllUsers();
                    }else{
                        vm.error = "User already exists";
                    }
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function deleteUser(userInUsers) {
            UserService
                .deleteUser(userInUsers._id)
                .success(function (status) {
                    findAllUsers();
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function selectUser(userInUsers) {
            UserService
                .findUserById(userInUsers._id)
                .success(function (userObj) {
                    vm.newUser = userObj;
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function updateUser(userInUsers) {
            UserService
                .updateUser(userInUsers._id, userInUsers)
                .success(function (status) {
                    vm.newUser=""
                    findAllUsers();
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function findAllUsers() {
            UserService
                .findAllUsers(userId)
                .success(function (users) {
                    if(users != '0') {
                        vm.users = users;
                        for(var i = 0; i < vm.users.length; i++){
                            vm.users[i].indexnum = i+1;
                        }
                    }
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

        function backToAdminList() {
            $location.url("/admin/"+$rootScope.currentUser._id);
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

        function searchPokemon() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/pokemon/search");
            }else{
                return false;
            }
        }

        function leaderboard() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/leaderboard");
            }else{
                return false;
            }
        }

    }

    function AdminPokemonController($routeParams, PokemonService, UserService, $location, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.logout = logout;
        vm.goToGlobalMap = goToGlobalMap;
        vm.goToMyMap = goToMyMap;
        vm.userprofile = userprofile;
        vm.createPokemon = createPokemon;
        vm.deletePokemon = deletePokemon;
        vm.selectPokemon = selectPokemon;
        vm.updatePokemon = updatePokemon;
        vm.backToAdminList = backToAdminList;
        vm.searchPokemon = searchPokemon;
        vm.leaderboard = leaderboard;

        if(!userId){
            userId = $rootScope.currentUser._id;
        }

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if(user != '0' && user.role.toLowerCase()==="admin") {
                        vm.user = user;
                        $rootScope.currentUser = user;
                        $rootScope.currentUserSignedIn = true;
                        findAllPokemons();
                    }else if(user != '0'){
                        $location.url("/user/"+user._id+"/profile/");
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();

        function createPokemon(newPokemon) {
            newPokemon._id = null;
            var commaMoves = newPokemon.moves.split(",");
            var listMoves = [];
            for(var i = 0; i < commaMoves.length; i++){
                listMoves.push(commaMoves[i]);
            }
            newPokemon.moves = listMoves;
            PokemonService
                .createPokemon(newPokemon)
                .success(function (newPokemonObj) {
                    vm.error ="";
                    if(newPokemonObj != '0') {
                        vm.newPokemon=""
                        findAllPokemons();
                    }else{
                        vm.error = "Pokemon already exists";
                    }
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function deletePokemon(pokemonInPokemons) {
            PokemonService
                .deletePokemon(pokemonInPokemons._id)
                .success(function (status) {
                    findAllPokemons();
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function selectPokemon(pokemonInPokemons) {
            PokemonService
                .findPokemonById(pokemonInPokemons._id)
                .success(function (pokemonObj) {
                    var moveList = "";
                    if(pokemonObj.moves.length > 0){
                        moveList = pokemonObj.moves[0];
                    }
                    for(var j = 1; j < pokemonObj.moves.length; j++){
                        moveList = moveList + ", "+ pokemonObj.moves[j]
                    }
                    pokemonObj.moveList = moveList;
                    vm.newPokemon = pokemonObj;
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function updatePokemon(pokemonInPokemons) {
            if(!pokemonInPokemons._id){
                vm.error = "Cannot update a value that is not created"
            }else {
                var commaMoves = pokemonInPokemons.moveList.split(",");
                var listMoves = [];
                for(var i = 0; i < commaMoves.length; i++){
                    listMoves.push(commaMoves[i]);
                }
                pokemonInPokemons.moves = listMoves;
                var pokemonObj = {pokemon: pokemonInPokemons};
                PokemonService
                    .updatePokemon(pokemonInPokemons._id, pokemonObj)
                    .success(function (status) {
                        vm.newPokemon = ""
                        findAllPokemons();
                    })
                    .error(function (err) {
                        console.log(err);
                    })
            }
        }

        function findAllPokemons() {
            PokemonService
                .findAllPokemon()
                .success(function (pokemons) {
                    if(pokemons != '0') {
                        vm.pokemons = pokemons;
                        for(var i = 0; i < vm.pokemons.length; i++){
                            vm.pokemons[i].indexnum = i+1;
                            var moveList = "";
                            if(vm.pokemons[i].moves.length > 0){
                                moveList = vm.pokemons[i].moves[0];
                            }
                            for(var j = 1; j < vm.pokemons[i].moves.length; j++){
                                moveList = moveList + ", "+ vm.pokemons[i].moves[j]
                            }
                            vm.pokemons[i].moveList = moveList;
                        }
                    }
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

        function backToAdminList() {
            $location.url("/admin/"+$rootScope.currentUser._id);
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

        function searchPokemon() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/pokemon/search");
            }else{
                return false;
            }
        }

        function leaderboard() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/leaderboard");
            }else{
                return false;
            }
        }

    }


    function AdminLocationController($routeParams, UserService, LocationService, $location, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.logout = logout;
        vm.goToGlobalMap = goToGlobalMap;
        vm.goToMyMap = goToMyMap;
        vm.deleteLocation = deleteLocation;
        vm.selectLocation = selectLocation;
        vm.updateLocation = updateLocation;
        vm.backToAdminList = backToAdminList;
        vm.userprofile = userprofile;
        vm.searchPokemon = searchPokemon;
        vm.leaderboard = leaderboard;

        if(!userId){
            userId = $rootScope.currentUser._id;
        }

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if(user != '0' && user.role.toLowerCase()==="admin") {
                        vm.user = user;
                        $rootScope.currentUser = user;
                        $rootScope.currentUserSignedIn = true;
                        findAllLocations();
                    }else if(user != '0'){
                        $location.url("/user/"+user._id+"/profile/");
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();

        function deleteLocation(locationInLocations) {
            LocationService
                .deleteLocation(locationInLocations._id)
                .success(function (status) {
                    findAllLocations();
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function selectLocation(locationInLocations) {
            LocationService
                .findLocationById(locationInLocations._id)
                .success(function (locationObj) {
                    vm.newLocation = locationObj;
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function updateLocation(locationInLocations) {
            if(!locationInLocations._id){
                vm.error = "Cannot update a value that is not created"
            }
            LocationService
                .updateLocation(locationInLocations._id, locationInLocations)
                .success(function (status) {
                    vm.newLocation=""
                    findAllLocations();
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function findAllLocations() {
            LocationService
                .findAllLocations()
                .success(function (locations) {
                    if(locations != '0') {
                        vm.locations = locations;
                        for(var i = 0; i < vm.locations.length; i++){
                            vm.locations[i].indexnum = i+1;
                        }
                    }
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

        function backToAdminList() {
            $location.url("/admin/"+$rootScope.currentUser._id);
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

        function searchPokemon() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/pokemon/search");
            }else{
                return false;
            }
        }

        function leaderboard() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/leaderboard");
            }else{
                return false;
            }
        }

    }

})();