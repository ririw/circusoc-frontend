var app = angular.module('CircusSite', ['ngMaterial', 'ngRoute', 'ngAnimate']);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'circus-main/circus-main.html'
            }).
            when('/artists', {
                templateUrl: 'circus-artists/circus-artists.html'
            }).
            when('/contact', {
                templateUrl: 'circus-contact/circus-contact.html'
            }).
            when('/hire', {
                templateUrl: 'circus-hire/circus-hire.html'
            }).
            when('/login', {
                templateUrl: 'circus-login/circus-login.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);
app.controller("TabNav", ['$scope', '$location', function ($scope, $location) {
    $scope.tabs = [
        {title: 'Home', location: '/'},
        {title: 'Hire', location: '/hire'},
        {title: 'Artists', location: '/artists'},
        {title: 'Contact', location: '/contact'},
    ];
    /*
    When we initialize the tab bar, we need to set the selectedIndex
    to one that matches the path we have in the location.

    Doing so ensures that we stay on the same page over refreshes and so on.

    We fail-through to homepage though, because it's index 0.
     */
    $scope.selectedIndex = 0;

    set_by_location = function() {
        $scope.selectedIndex = -1;
        for (i = 0; i < $scope.tabs.length; i++) {
            if ($scope.tabs[i]["location"] == $location.path()) {
                $scope.selectedIndex = i;
            }
        }
    };

    $scope.setlocation = function(selected){
        $location.path(selected.location)
    };

    $scope.$on('$routeChangeSuccess', function(event, data) {
        set_by_location()
    })
}]);
