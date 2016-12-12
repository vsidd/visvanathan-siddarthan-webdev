/**
 * Created by Siddarthan on 02-Dec-16.
 */

(function () {
    angular
        .module("PokemonLocator")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl : "views/home/home.view.client.html",
                controller  : "HomeController",
                controllerAs : "model",
                resolve: { checkLoggedinHome: checkLoggedinHome }
            })
            .when("/homepage", {
                templateUrl : "views/home/home.view.client.html",
                controller  : "HomeController",
                controllerAs : "model"
            })
            .when("/login",{
                templateUrl : "views/user/login.view.client.html",
                controller : "LoginController",
                controllerAs : "model"
            })
            .when("/logout",{
                templateUrl : "views/user/login.view.client.html",
                controller : "LoginController",
                controllerAs : "model"
            })
            .when("/user/:uid/profile",{
                templateUrl : "views/user/profile.view.client.html",
                controller : "ProfileController",
                controllerAs : "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/register",{
                templateUrl : "views/user/register.view.client.html",
                controller : "RegisterController",
                controllerAs : "model"
            })
            .when("/user/:uid/map",{
                templateUrl : "views/map/map-global-list.view.client.html",
                controller : "ListMapController",
                controllerAs : "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/mymap",{
                templateUrl : "views/map/map-my-list.view.client.html",
                controller : "MyListMapController",
                controllerAs : "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/mymap/delete",{
                templateUrl : "views/map/map-my-list-delete.view.client.html",
                controller : "MyDeleteMapController",
                controllerAs : "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/leaderboard",{
                templateUrl : "views/pokemon/pokemon-user-leaderboard.view.client.html",
                controller : "LeaderboardController",
                controllerAs : "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/:pid/map",{
                templateUrl : "views/map/map-global-list-add.view.client.html",
                controller : "AddMapController",
                controllerAs : "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/pokemon/search",{
                templateUrl : "views/pokemon/pokemon-search.view.client.html",
                controller : "PokemonSearchController",
                controllerAs : "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/pokemon/:pid",{
                templateUrl : "views/pokemon/pokemon-page.view.client.html",
                controller : "PokemonDetailController",
                controllerAs : "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedin($q, UserService, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLoggedin()
                .success(
                    function (user) {
                        $rootScope.errorMessage = null;
                        if(user != '0') {
                            $rootScope.currentUser = user;
                            $rootScope.currentUserSignedIn = true;
                            deferred.resolve();
                        } else {
                            $rootScope.currentUser = null;
                            $rootScope.currentUserSignedIn = false;
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }

        function checkLoggedinHome($q, UserService, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLoggedin()
                .success(
                    function (user) {
                        $rootScope.errorMessage = null;
                        if(user != '0') {
                            $rootScope.currentUser = user;
                            $rootScope.currentUserSignedIn = true;
                            deferred.resolve();
                        } else {
                            $rootScope.currentUser = null;
                            $rootScope.currentUserSignedIn = false;
                            deferred.reject();
                            $location.url("/homepage");
                        }
                    }
                );
            return deferred.promise;
        }
    }
})();