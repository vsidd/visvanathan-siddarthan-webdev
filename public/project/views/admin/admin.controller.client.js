/**
 * Created by Siddarthan on 13-Dec-16.
 */

(function () {
    angular
        .module("PokemonLocator")
        .controller("AdminHomeController", AdminHomeController)
        .controller("AdminUserController", AdminUserController)
        // .controller("AdminLocationController", AdminLocationController)
        .controller("AdminPokemonController", AdminPokemonController);

    function AdminHomeController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.logout = logout;
        vm.goToGlobalMap = goToGlobalMap;
        vm.goToMyMap = goToMyMap;
        vm.userprofile = userprofile;

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
            PokemonService
                .createUser(newPokemon)
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

        function deletePokemon(userInUsers) {
            UserService
                .deleteUser(userInUsers._id)
                .success(function (status) {
                    findAllUsers();
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function selectPokemon(userInUsers) {
            UserService
                .findUserById(userInUsers._id)
                .success(function (userObj) {
                    vm.newUser = userObj;
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function updatePokemon(userInUsers) {
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
        function findAllPokemons() {
            PokemonService
                .findAllPokemon()
                .success(function (pokemons) {
                    if(pokemons != '0') {
                        vm.pokemons = pokemons;
                        for(var i = 0; i < vm.pokemons.length; i++){
                            vm.pokemons[i].indexnum = i+1;
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