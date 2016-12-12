/**
 * Created by Siddarthan on 10-Dec-16.
 */

(function () {
    angular
        .module("PokemonLocator")
        .controller("HomeController", HomeController);

    function HomeController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        vm.logout = logout;
        vm.goToGlobalMap = goToGlobalMap;
        vm.goToMyMap = goToMyMap;
        vm.userprofile = userprofile;
        vm.searchPokemon = searchPokemon;
        vm.leaderboard = leaderboard;

        function goToGlobalMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/map");
            }else{
                return false;
            }
        }
        function logout() {
            UserService
                .logout()
                .success(function () {
                    $rootScope.currentUser = null;
                    $rootScope.currentUserSignedIn = false;
                    $location.url("/homepage");
                })
                .error(function (error) {

                })
        }

        function userprofile() {
            $location.url("/user/"+$rootScope.currentUser._id+"/profile/");
        }

        function goToMyMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/mymap");
            }else{
                return false;
            }
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