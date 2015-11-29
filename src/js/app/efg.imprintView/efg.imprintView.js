'use strict';

angular.module('efg.imprintView', [
    'efg.componentDirective',
    'bootstrap.headerbarDirective',
    'ng',
    'ngRoute'
])

.config(function($routeProvider) {
    $routeProvider.when('/imprint', {
        templateUrl: 'efg.imprintView.tpl.html'
    });
});