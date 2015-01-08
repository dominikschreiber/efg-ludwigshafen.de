'use strict';

angular.module('efg.sermonDirective', [
    'efg.trustFilter',
    'ng'
])

.directive('sermon', function() {
    return {
        replace: true,
        restrict: 'E',
        scope: {
            sermon: '=content'
        },
        templateUrl: 'efg.sermonDirective.tpl.html'
    };
});