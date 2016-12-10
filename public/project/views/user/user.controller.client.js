/**
 * Created by Siddarthan on 03-Dec-16.
 */

(function () {
    angular
        .module("PokemonLocator")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;

        function login() {
            if (vm.user.username === undefined || vm.user.password === undefined) {
                vm.error = "Please fill out the fields";
            } else {
                UserService
                    .login(vm.user.username, vm.user.password)
                    .success(function (user) {
                        if (user === '0') {
                            vm.error = "No such user";
                        } else {
                            $rootScope.currentUser = user;
                            // $location.url("/register/" + user._id); //TODO: change here
                            $location.url("/user/"+user._id+"/map");
                            // $location.url("/user/list");
                        }
                    })
                    .error(function (serverError) {
                        vm.error = serverError;
                    });
            }
        }
    }




    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;

        function register() {
            if(vm.user.username === undefined
                || vm.user.password === undefined
                || vm.verifyPassword === undefined){
                vm.error = "One or more field is empty";
            }else if(vm.user.password !== vm.verifyPassword) {
                vm.error = "Entered password do not match with each other"
            }else {
                UserService
                    .register(vm.user)
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user === '0'){
                                vm.error = "Username already exists";
                            }else {
                                $rootScope.currentUser = user;
                                // $location.url("/login/" + user._id); //TODO: change here
                                $location.url("/user/"+user._id+"/profile/");
                            }
                        },
                        function (err) {
                            vm.error = err;
                        }
                    );
            }
        }
    }

    function ProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;

        if(!userId){
            userId = $rootScope.currentUser._id;
        }

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if(user != '0') {
                        vm.user = user;
                        // vm.user.role = "ADMIN"
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

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                })
                .error(function (error) {

                })
        }
    }
})();