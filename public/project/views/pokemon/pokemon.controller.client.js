/**
 * Created by Siddarthan on 09-Dec-16.
 */

(function () {
    angular
        .module("PokemonLocator")
        .controller("PokemonSearchController", PokemonSearchController)
        .controller("PokemonDetailController", PokemonDetailController)
        .controller("LeaderboardController", LeaderboardController);

    function PokemonSearchController($location, UserService, $routeParams, LocationService, PokemonService, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.logout = logout;
        vm.goToMyMap = goToMyMap;
        vm.goToGlobalMap = goToGlobalMap;
        vm.userprofile = userprofile;
        vm.searchPokeApi = searchPokeApi;
        vm.newSearch = newSearch;
        vm.goToPokemon = goToPokemon;

        vm.name = $routeParams.name;
        vm.weight = $routeParams.weight;
        vm.base_experience = $routeParams.base_experience;
        vm.height = $routeParams.height;
        vm.query = $routeParams.query;
        vm.pokemonNumber = $routeParams.pokemonNumber;

        // vm.resultPage = $routeParams.resultPage;
        // vm.error = $routeParams.error;
        // vm.backFromPage = $routeParams.backFromPage;

        function init() {
            if($routeParams.backFromPage){
                if($routeParams.backFromPage === "true"){
                    vm.backFromPage = true;
                }else{
                    vm.backFromPage = false;
                }
            }
            if($routeParams.error){
                if($routeParams.error === "true"){
                    vm.error = true;
                }else{
                    vm.error = false;
                }
            }
            PokemonService
                .findAllPokemon()
                .success(function (pokemonList) {
                    vm.resultPage = false;
                    vm.pokemonList = pokemonList;
                    vm.pokemonListMinVal = [];
                    for(var i = 0; i < vm.pokemonList.length; i++){
                        var pokemon = vm.pokemonList[i];
                        var minVal = {aaaaa: pokemon.pokemonNumber, bbbbb: pokemon.name, ccccc: pokemon.type}
                        vm.pokemonListMinVal[i] = minVal;
                    }
                    if($routeParams.resultPage){
                        if($routeParams.resultPage === "true"){
                            vm.resultPage = true;
                        }else{
                            vm.resultPage = false;
                        }
                    }
                })
                .error(function (err) {

                })

        }
        init();

        function newSearch(query) {
            vm.query = "";
            vm.resultPage = false;
            vm.error = false;
            vm.pokemonNumber = "";
        }

        function goToPokemon() {
            if(vm.pokemonNumber){
                $location.url("/user/"+$rootScope.currentUser._id+"/pokemon/"+vm.pokemonNumber+"?base_experience="+vm.base_experience+
                    "&weight="+vm.weight+"&height="+vm.height+"&query="+vm.query+"&resultPage="+vm.resultPage+
                    "&error="+vm.error+"&name="+vm.name);
            }
        }

        function searchPokeApi(query) {
            vm.error = false;
            if (!vm.resultPage)
            {
                if (query) {
                    var flag = false;
                    var pokemonNumber = ""
                    query = query.trim().toLowerCase();
                    for (var i = 0; i < vm.pokemonListMinVal.length; i++) {
                        if (vm.pokemonListMinVal[i].bbbbb.toLowerCase() === query) {
                            flag = true;
                            pokemonNumber = vm.pokemonListMinVal[i].aaaaa;
                        }
                    }
                    if (flag) {
                        PokemonService
                            .findFromPokeApi(pokemonNumber)
                            .success(function (pokemonDetail) {
                                vm.resultPage = true;
                                vm.pokemonDetail = pokemonDetail;
                                vm.name = pokemonDetail.name;
                                vm.weight = pokemonDetail.weight;
                                vm.base_experience = pokemonDetail.base_experience;
                                vm.height = pokemonDetail.height;
                                vm.pokemonNumber = pokemonNumber;
                                console.log(pokemonDetail);
                            })
                            .error(function (err) {
                                vm.error = "Thrid Party API returned error : " + err;
                            })
                    } else {
                        vm.error = "Please provide a valid input from below"
                    }
                } else {
                    vm.error = "Please provide a valid input from below"
                }
            }else {
                vm.error = "To do a new search, please press new search button to clear current search"
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




    function PokemonDetailController($location, UserService, $routeParams, LocationService, PokemonService, $rootScope) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.pokemonNumber = $routeParams.pid;
        vm.base_experience = $routeParams.base_experience;
        vm.weight = $routeParams.weight;
        vm.height = $routeParams.height;
        vm.query = $routeParams.query;
        vm.resultPage = $routeParams.resultPage;
        vm.error = $routeParams.error;
        vm.name = $routeParams.name;
        vm.logout = logout;
        vm.goToMyMap = goToMyMap;
        vm.goToGlobalMap = goToGlobalMap;
        vm.userprofile = userprofile;
        vm.backToSearch = backToSearch;
        vm.addComment = addComment;

        function init() {
            PokemonService
                .findPokemonByNumber(vm.pokemonNumber)
                .success(function (pokemon) {
                    vm.pokemon = pokemon;
                    var moves = vm.pokemon.moves;
                    var movesStr = moves[0];
                    for(var i = 1; i < moves.length; i++){
                        movesStr = movesStr+", "+ moves[i]
                    }
                    vm.pokemon.moves = movesStr;
                    vm.pokemonImg = "./images/gen1/"+vm.pokemon.pokemonNumber+".png";
                    var users = vm.pokemon.users;
                    var uniqueUsers = function(users) {
                        return users.reduce(function(p, c) {
                            if (p.indexOf(c) < 0) p.push(c);
                            return p;
                        }, []);
                    };
                    vm.uniqueUsers = uniqueUsers(users);
                    vm.comments = pokemon.comments;
                })
                .error(function (err) {

                })
        }
        init();

        function backToSearch() {
                $location.url("/user/"+$rootScope.currentUser._id+"/pokemon/search?base_experience="+vm.base_experience+
                    "&weight="+vm.weight+"&height="+vm.height+"&query="+vm.query+"&resultPage="+vm.resultPage+
                    "&error="+vm.error+"&name="+vm.name+"&backFromPage="+true+"&pokemonNumber="+vm.pokemonNumber);
        }

        function addComment() {
            if(vm.comment){
                var m_names = ["January", "February", "March","April", "May", "June", "July", "August", "September","October", "November", "December"];

                var date = new Date();
                var curr_date = date.getDate();
                var curr_month = date.getMonth();
                var curr_year = date.getFullYear();

                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;

                var today = "on "+m_names[curr_month]+" "+curr_date+"th, "+curr_year+" "+strTime;


                var commentObj = {username: $rootScope.currentUser.username, comment: vm.comment, today: today};
                PokemonService
                    .addComment(vm.pokemon._id, commentObj)
                    .success(function (status) {
                        vm.comments.push(commentObj);
                        vm.comment = "";
                    })
                    .error(function (err) {
                        console.log(err);
                    })
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

    function LeaderboardController($location, UserService, $routeParams, LocationService, PokemonService, $rootScope) {
        var vm = this;
        vm.userId = $routeParams.uid;

        vm.logout = logout;
        vm.goToMyMap = goToMyMap;
        vm.goToGlobalMap = goToGlobalMap;
        vm.userprofile = userprofile;

        function init() {
            UserService
                .findAllUsersPokemons()
                .success(function (users) {
                    users.sort(function (a, b) {
                        if(a.pokemons.length < b.pokemons.length){
                            return 1;
                        }
                        if(a.pokemons.length > b.pokemons.length){
                            return -1;
                        }
                        return 0;
                    })
                    vm.userList = users;
                    console.log(users);
                })
                .error(function (err) {

                })
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

})();