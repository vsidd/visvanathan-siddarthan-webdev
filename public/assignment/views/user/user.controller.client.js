/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    var idGen = 788;

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login(username, password) {
            var user = UserService.findUserByCredentials(username,password);
            if(user === null){
                vm.error = "No such user";
            }else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        function register(username, password, verifyPassword) {
            if(username === undefined
                || password === undefined
                || verifyPassword === undefined){
                vm.error = "One or more field is empty";
            }else if(password !== verifyPassword) {
                vm.error = "Entered password do not match with each other"
            }else {
                idGen = idGen + 1;
                var newId = idGen.toString();
                var user = {
                    _id: newId, username: username, password: password, firstName: "", lastName: ""
                };
                UserService.createUser(user);
                $location.url("/user/" + newId);
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        var user = UserService.findUserById(userId);
        if(user != null) {
            vm.user = user;
        }
        
        vm.updateUser = updateUser;
        
        function updateUser(username, email, firstname, lastname) {
            vm.user.username = username;
            vm.user.email = email;
            vm.user.firstName = firstname;
            vm.user.lastName = lastname;
            UserService.updateUser(userId, vm.user);
        }
    }
})();