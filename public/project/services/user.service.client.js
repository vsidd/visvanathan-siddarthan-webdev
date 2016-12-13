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
            "checkLoggedin" : checkLoggedin,
            "checkAdmin": checkAdmin,
            "addComment" : addComment,
            "updateFollowingUser" : updateFollowingUser,
            "removeFollowingUser" : removeFollowingUser,
            "findAllUsers" : findAllUsers
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

        function checkAdmin() {
            return $http.post("/api/project/checkAdmin");
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user);
        }


        function addComment(userId, comment) {
            var url = "/api/project/user/"+userId+"/comment";
            return $http.post(url, comment);
        }

        function findAllUsers(userId) {
            var url = "/api/project/users/"+userId;
            return $http.get(url);
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

        function updateFollowingUser(userIdToAdd, userId2) {
            var url = "/api/project/"+userId2+"/follow";
            return $http.post(url, userIdToAdd);
        }

        function removeFollowingUser(userIdToRemove, userId2) {
            var url = "/api/project/"+userId2+"/unfollow";
            return $http.post(url, userIdToRemove);
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