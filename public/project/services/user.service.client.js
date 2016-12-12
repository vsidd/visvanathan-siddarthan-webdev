/**
 * Created by Siddarthan on 03-Dec-16.
 */

(function () {
    angular
        .module("PokemonLocator")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findAllUsersPokemons" : findAllUsersPokemons,
            "findUserByUserName" : findUserByUserName,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser,
            "login" : login,
            "logout" : logout,
            "register" : register,
            "checkLoggedin" : checkLoggedin
        };

        return api;

        function login(username, password) {
            var user = {
                username : username,
                password : password
            }
            return $http.post("/api/project/login", user);
        }

        function logout(user) {
            return $http.post("/api/project/logout");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function checkLoggedin() {
            return $http.post("/api/project/checkLoggedin");
        }

        function createUser(user) { //TODO:
            var url = "/api/project/user";
            return $http.post(url, user);
        }

        function findUserById(userId){
            var url = "/api/project/user/"+userId;
            return $http.get(url);
        }

        function findUserByUserName(username){ //TODO: find if anyone is using
            var url = "/api/project/user/username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {//TODO: find if anyone is using
            var url = '/api/project/user?username='+username+'&password='+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/"+userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url);
        }

        function findAllUsersPokemons() {
            var url = "/api/project/users/pokemons";
            return $http.get(url);
        }
    }
})();