app.controller("JoinController", ['$scope', '$location', '$http', '$mdToast', 'circ_login',
    function($scope, $location, $http, $mdToast, circ_login) {
        if (!circ_login.loggedin()) {
            toast = $mdToast.simple()
                .content("Please log in.")
                .position('bottom')
                .hideDelay(2500);
            $mdToast.show(toast);
            $location.path('/login');
            return;
        }
        $scope.name = null;
        $scope.email = null;
        $scope.student_number = null;
        $scope.isarc = false;
        $scope.subscribed = false;
        $scope.join = function() {
            var toast = null;
            if ($scope.joinform.$invalid) {
                toast = $mdToast.simple()
                    .content("Please fill in all details.")
                    .position('bottom')
                    .hideDelay(1000);
                $mdToast.show(toast);
                return;
            }
            if (!$scope.waiver) {
                toast = $mdToast.simple()
                    .content("Must accept waiver.")
                    .position('bottom')
                    .hideDelay(1000);
                $mdToast.show(toast);
                return;
            }
            if (!circ_login.loggedin) {
                toast = $mdToast.simple()
                    .content("Please log in.")
                    .position('bottom')
                    .hideDelay(2500);
                $mdToast.show(toast);
                $location.path('/login');
                return;
            }
            var token = circ_login.get_token();
            var request = {
                name: $scope.name,
                email: $scope.email,
                studentNumber: $scope.student_number,
                isArc: $scope.isarc,
                subscribed: $scope.subscribed
            };

            $http.put("http://localhost.com:8080/member?tok=" + token, request)
                .success(function(data, status) {
                    var toast = $mdToast.simple()
                        .content("user added ✓")
                        .position('bottom')
                        .hideDelay(2500);
                    $mdToast.show(toast);
                })
                .error(function(data, status) {
                    var reason = data.hasOwnProperty('reason') ? data.reason : "other error";
                    var toast = $mdToast.simple()
                        .content("something went wrong: " + reason)
                        .position('bottom')
                        .hideDelay(2500);
                    $mdToast.show(toast);
                    console.error(data, status);
                });
        }
    }
]);
