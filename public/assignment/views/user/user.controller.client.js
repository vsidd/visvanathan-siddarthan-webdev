/**
 * Created by Siddarthan on 17-Oct-16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            if (username === undefined || password === undefined) {
                // vm.error = "Please fill out the fields";
            } else {
                UserService
                    .login(username, password)
                    .success(function (user) {
                        if (user === '0') {
                            vm.error = "No such user";
                        } else {
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
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

        function register(username, password, verifyPassword) {
            if(username === undefined
                || password === undefined
                || verifyPassword === undefined){
                // vm.error = "One or more field is empty";
            }else if(password !== verifyPassword) {
                vm.error = "Entered password do not match with each other"
            }else {
                var user = {
                    username: username, password: password, firstName: "", lastName: ""
                };
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user === '0'){
                                vm.error = "Username already exists";
                            }else {
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
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
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();

        function updateUser(username, email, firstname, lastname) {
            vm.error = "";
            if(!username){
                vm.error = "Username is required"
            }else {
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