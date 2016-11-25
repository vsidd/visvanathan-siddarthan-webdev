/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService
                .findUserByCredentials(username,password)
                .success(function(user) {
                    if(user === '0'){
                        vm.error = "No such user";
                    }else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function(serverError) {
                    vm.error = "server returned error";
                });
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
                var user = {
                     username: username, password: password, firstName: "", lastName: ""
                };
                UserService
                    .createUser(user)
                    .success(function (user) {
                        if(user === '0'){
                            vm.error = "Username already exists";
                        }else {
                            $location.url("/user/" + user._id);
                        }
                    })
                    .error(function (serverError) {
                        vm.error = "server returned error";
                    });
            }
        }
    }

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        
        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if(user != '0') {
                        vm.user = user;
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();

        function updateUser(username, email, firstname, lastname) {
            vm.user.username = username;
            vm.user.email = email;
            vm.user.firstName = firstname;
            vm.user.lastName = lastname;
            UserService
                .updateUser(userId, vm.user)
                .success(function (successFromServer) {

                })
                .error(function (errorFromServer) {
                    vm.error = "server returned error";
                });
        }

        function unregisterUser() {
            UserService
                .deleteUser(userId)
                .success(function(successFromServer){
                    $location.url("/login");
                })
                .error(function(){

                });
        }
    }
})();