'use strict';

angular.module('efg.imprintView', [
    'efg.componentDirective',
    'ng',
    'ngRoute'
])

.config(function($routeProvider) {
    $routeProvider.when('/imprint', {
        templateUrl: 'efg.imprintView.tpl.html'
    });
});