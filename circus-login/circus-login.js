app.controller("LoginController", ['$scope', '$location', '$http', '$mdToast',
    function ($scope, $location, $http, $mdToast) {
        $scope.loggedin_cache = false;
        $scope.loggedin = function() {
            return $scope.loggedin_cache;
        };
        $scope.loggedin_check = function() {
            // $cookieStore.get('token') && // Short circuit eval, if token is not present, we're logged out
            var token = localStorage.getItem('token');
            $http.get("http://localhost.com:8080/authenticated?tok=" + token)
                .success(function(data, status) {
                    $scope.loggedin_cache = data.authenticated;
                })
                .error(function(data, status){
                    console.error(data, status);
                    $scope.loggedin_cache = false;
                });
        };
        $scope.loggedin_check();

        $scope.login = function(){
            var request = {
                username: $scope.username,
                password: $scope.password
            };
            $http.post("http://localhost.com:8080/login", request)
                .success(function(data, status) {
                    localStorage.setItem('token', data.token);
                    var toast = $mdToast.simple()
                        .content("Login successful!")
                        .position('bottom')
                        .hideDelay(2500);
                    $mdToast.show(toast);
                    $location.path('/');
                }).error(function(data, status) {
                    var message = undefined;
                    if (data.hasOwnProperty('error') && data.error == "Unknown username or password")
                        message = "invalid username or password";
                    else
                        message = "something went wrong";
                    var toast = $mdToast.simple()
                        .content(message)
                        .position('bottom')
                        .hideDelay(0);
                    $mdToast.show(toast);
                    console.error(data, status)
            })
        };

        $scope.logout = function() {
            var token = localStorage.getItem('token');
            $http.post("http://localhost.com:8080/logout?tok=" + token, {})
                .success(function(data, status) {
                    localStorage.setItem('token', data.token);
                    var toast = $mdToast.simple()
                        .content("Logout successful!")
                        .position('bottom')
                        .hideDelay(2500);
                    $mdToast.show(toast);
                    $location.path('/');
                }).error(function(data, status) {
                    var toast = $mdToast.simple()
                        .content("something went wrong.")
                        .position('bottom')
                        .hideDelay(0);
                    $mdToast.show(toast);
                    console.error(data, status)
                });
        }
    }
]);