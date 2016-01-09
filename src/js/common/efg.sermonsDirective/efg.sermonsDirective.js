angular.module('efg.sermonsDirective', [
    'efg.sermonDirective',
    'efg.sermonService',
    'efg.sermonApi',
    'ng'
])

.directive('sermons', function (sermonApi, sermon) {
    return {
        templateUrl: 'efg.sermonsDirective.tpl.html',
        link: function ($scope, $element, $attributes) {
            $scope.sermons = [];

            sermonApi.query().then(function(sermons) {
                $scope.sermons = sermons;
            });

            $scope.activate = function(s) {
                sermon.set(s);
            };

            $scope.isactive = function(s) {
                return sermon.is(s);
            };
        }
    }
});