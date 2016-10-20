/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: ""  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: ""  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: ""  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "" }
        ];
        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUserName" : findUserByUserName,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };

        return api;

        function createUser(user) {
            users.push(user);
        }

        function findUserById(userId){
            for(var u in users){
                user = users[u];
                if(user._id === userId){
                    return JSON.parse(JSON.stringify(user));
                }
            }
            return null;
        }

        function findUserByUserName(username){
            for(var u in users){
                user = users[u];
                if(user.username === username){
                    return JSON.parse(JSON.stringify(user));
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users){
                user = users[u];
                if(user.username === username &&
                    user.password === password){
                    return JSON.parse(JSON.stringify(user));
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for(var u in users){
                localUser = users[u];
                if(localUser._id === userId){
                    users[u] = user;
                    break;
                }
            }
        }

        function deleteUser(userId) {
            for(var u in users){
                user = users[u];
                if(user._id === userId){
                    users.splice(u, 1);
                    break;
                }
            }
        }
    }
})();