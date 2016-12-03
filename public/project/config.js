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
                // controller  : "LoginController",
                // controllerAs : "model"
            })
            .when("/login",{
                templateUrl : "views/user/login.view.client.html",
                // controller : "RegisterController",
                // controllerAs : "model"
            })
            .when("/register",{
                templateUrl : "views/user/register.view.client.html",
                // controller : "RegisterController",
                // controllerAs : "model"
            })
            .when("/map",{
                templateUrl : "views/map/map.view.client.html",
                // controller : "RegisterController",
                // controllerAs : "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();