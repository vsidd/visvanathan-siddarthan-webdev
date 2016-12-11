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
                            $rootScope.currentUserSignedIn = true;
                            // $location.url("/register/" + user._id); //TODO: change here
                            // $location.url("/user/"+user._id+"/map");
                            $location.url("/home");
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
                                $rootScope.currentUserSignedIn = true;
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
        vm.goToGlobalMap = goToGlobalMap;
        vm.goToMyMap = goToMyMap;

        if(!userId){
            userId = $rootScope.currentUser._id;
        }

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if(user != '0') {
                        vm.user = user;
                        $rootScope.currentUser = user;
                        $rootScope.currentUserSignedIn = true;
                        // vm.user.role = "ADMIN"
                    }
                })
                .error(function (serverError) {
                    vm.error = "server returned error";
                });
        }
        init();

        function updateUser() {
           if(vm.user) {
               UserService
                   .updateUser(userId, vm.user)
                   .success(function (successFromServer) {
                       $location.url("/home");
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
                    $rootScope.currentUserSignedIn = false;
                    $rootScope.currentUser = null;
                })
                .error(function(){

                });
        }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $rootScope.currentUser = null;
                    $rootScope.currentUserSignedIn = false;
                    $location.url("/home");
                })
                .error(function (error) {

                })
        }

        function goToGlobalMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/map");
            }else{
                return false;
            }
        }
        function goToMyMap() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/mymap");
            }else{
                return false;
            }
        }

    }
})();