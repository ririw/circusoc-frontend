app.directive('performerCard', ['$http', function($http) {
    return {
        restrict: 'AE',
        templateUrl: 'performer/performer.html',
        scope: {
            performerId: '@'
        },
        controller: function($scope, $element, $attrs, $transclude, $http) {
            $scope.image_ix = 0;
            $scope.current_image = function(){
                if ($scope.performer)
                    return $scope.performer.other_pictures[$scope.image_ix % $scope.performer.other_pictures.length];
                else return null;
            };
            $scope.profile_picture = function() {
                if ($scope.performer)
                    return $scope.performer.profile_picture;
                else return null;
            };
            $scope.next_image = function(){
                $scope.image_ix = $scope.image_ix + 1;
                if ($scope.image_ix >= $scope.performer.other_pictures.length) $scope.image_ix = 0;
            };
            $scope.prev_image = function(){
                $scope.image_ix = $scope.image_ix - 1;
                if ($scope.image_ix < 0) $scope.image_ix = $scope.performer.other_pictures.length - 1;
            };
        },
        link: function (scope, element, attrs) {
            $http.get('http://localhost:8080/performer/' + scope.performerId)
                .success(function (data, status) {
                    scope.performer = Performer(data);
                })
                .error(function (data, status) {
                    console.error(data)
                });
        }
    }
}]);

function Performer(data) {
    return {
        id: data['id'],
        name: data['name'],
        skills: data['skills'],
        profile_picture: data['profile_picture'],
        other_pictures: data['other_pictures'],
        shown: data['shown']
    }
}