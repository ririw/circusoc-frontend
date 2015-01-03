app.controller("ArtistsController", ['$scope', '$http', '$timeout',
    function ($scope, $http, $timeout) {
        $http.get('http://localhost:8080/performers')
            .success(function(data, status){
                $scope.artists = data;
                $timeout(function () {
                    var msnry = new Masonry('#container', {
                        // options
                        columnWidth: '.performer',
                        itemSelector: '.performer'
                    });
                }, 300);
            })
            .error(function(data, status){console.error(data)});
    $scope.artists = [];
}]);
