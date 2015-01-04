var app = angular.module('CircusSite', ['ngMaterial', 'ngRoute', 'ngAnimate']);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'circus-main/circus-main.html'
                // controller: 'AddOrderController'
            }).
            when('/artists', {
                templateUrl: 'circus-artists/circus-artists.html'
            }).
            when('/contact', {
                templateUrl: 'circus-contact/circus-contact.html'
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
    $scope.selectedIndex = 0;
    $scope.setlocation = function(selected){
        $location.path(selected.location)
    };
}]);
