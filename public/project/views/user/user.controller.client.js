/**
 * Created by Siddarthan on 03-Dec-16.
 */

(function () {
    angular
        .module("PokemonLocator")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("SocialProfileController", SocialProfileController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;

        function login() {
            vm.error = "";
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
                // vm.user.role = "ADMIN"
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


    function SocialProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        var userId1 = $routeParams.uid1;
        var userId2 = $routeParams.uid2;

        vm.logout = logout;
        vm.goToGlobalMap = goToGlobalMap;
        vm.goToMyMap = goToMyMap;
        vm.addComment = addComment;
        vm.backToLeaderboard = backToLeaderboard;
        vm.toggleCheckbox = toggleCheckbox;

        if(!userId1){
            userId1 = $rootScope.currentUser._id;
        }

        function init() {
            UserService.findUserById(userId1)
                .success(function (user1) {
                    if(user1 != '0'){
                        $rootScope.currentUser = user1;
                        $rootScope.currentUserSignedIn = true;
                        UserService.findUserById(userId2)
                            .success(function (user2) {
                                vm.viewedUser = user2;
                                console.log(vm.viewedUser.following.indexOf(user1._id))
                                if(vm.viewedUser.following.indexOf(user1._id) != -1){
                                    vm.checkboxcheck = true;
                                }else{
                                    vm.checkboxcheck = false;
                                }
                                vm.comments = user2.comments;
                                vm.pokemonCount = user2.pokemons.length;
                                var userPokemons = "None";
                                if(user2.pokemons.length > 0){
                                    userPokemons = user2.pokemons[0].name;
                                }
                                for(var i = 1; i < user2.pokemons.length; i++){
                                    userPokemons = userPokemons+ ", "+user2.pokemons[i].name;
                                }
                                vm.userAllPokemons = userPokemons;
                            })
                            .error(function (serverError) {
                                vm.error = serverError
                            })
                    }
                })
                .error(function (serverError) {
                    vm.error = serverError
                })
        }
        init();

        function toggleCheckbox() {
            if(vm.checkboxcheck){
                var userIdToRemove = {userId : userId1};
                UserService
                    .removeFollowingUser(userIdToRemove, userId2)
                    .success(function (status) {
                        console.log(status);
                    })
                    .error(function (err) {
                        console.log(err);
                    })
                vm.checkboxcheck = false;
                console.log("setting false")
            }else{
                var userIdToAdd = {userId: userId1};
                UserService
                    .updateFollowingUser(userIdToAdd, userId2)
                    .success(function (status) {
                        console.log(status);
                    })
                    .error(function (err) {
                        console.log(err);
                    })
                vm.checkboxcheck = true;
                console.log("setting true")
            }
        }


        function addComment() {
            if(vm.comment){
                var m_names = ["January", "February", "March","April", "May", "June", "July", "August", "September","October", "November", "December"];

                var date = new Date();
                var curr_date = date.getDate();
                var curr_month = date.getMonth();
                var curr_year = date.getFullYear();

                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;

                var today = "on "+m_names[curr_month]+" "+curr_date+"th, "+curr_year+" "+strTime;


                var commentObj = {username: $rootScope.currentUser.username, comment: vm.comment, today: today};
                UserService
                    .addComment(vm.viewedUser._id, commentObj)
                    .success(function (status) {
                        vm.comments.push(commentObj);
                        vm.comment = "";
                    })
                    .error(function (err) {
                        console.log(err);
                    })
            }
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
        
        function backToLeaderboard() {
            if($rootScope.currentUserSignedIn){
                $location.url("/user/"+$rootScope.currentUser._id+"/leaderboard");
            }else{
                return false;
            }
        }

    }
})();