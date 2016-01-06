angular.module('efg.sermonsDirective', [
    'efg.sermonDirective',
    'efg.sermonApi',
    'ng'
])

.directive('sermons', function (sermonApi) {
    return {
        templateUrl: 'efg.sermonsDirective.tpl.html',
        link: function ($scope, $element, $attributes) {
            $scope.sermons = [];
            $scope.current = {};

            sermonApi.query().then(function(sermons) {
                $scope.sermons = sermons;
                $scope.current = $scope.sermons[0];
            });

            $scope.activate = function(sermon) {
                $scope.current = sermon;
            };

            $scope.isactive = function(sermon) {
                return $scope.current === sermon;
            };
        }
    }
});