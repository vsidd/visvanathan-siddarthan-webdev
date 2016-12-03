/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
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
            return $http.post("/api/login", user);
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function checkLoggedin() {
            return $http.post("/api/checkLoggedin");
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserById(userId){
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUserName(username){
           var url = "/api/user/username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url);
        }
    }
})();