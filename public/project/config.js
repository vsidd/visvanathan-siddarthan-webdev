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
                controller  : "LoginController",
                controllerAs : "model"
            })
            .when("/login",{
                templateUrl : "views/user/login.view.client.html",
                controller : "LoginController",
                controllerAs : "model"
            })
            .when("/user/:uid/profile",{
                templateUrl : "views/user/profile.view.client.html",
                controller : "ProfileController",
                controllerAs : "model"
            })
            .when("/register",{
                templateUrl : "views/user/register.view.client.html",
                controller : "RegisterController",
                controllerAs : "model"
            })
            .when("/user/:uid/map",{
                templateUrl : "views/map/list.map.view.client.html",
                controller : "ListMapController",
                controllerAs : "model"
            })
            .when("/user/:uid/:pid/map",{
                templateUrl : "views/map/add.map.view.client.html",
                controller : "AddMapController",
                controllerAs : "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();