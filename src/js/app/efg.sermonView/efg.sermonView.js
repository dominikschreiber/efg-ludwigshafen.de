'use strict';

angular.module('efg.sermonView', [
    'efg.sermonsDirective',
    'bootstrap.headerbarDirective',
    'btford.markdown',
	'ng',
	'ngRoute'
])

.config(function ($routeProvider) {
    $routeProvider.when('/sermon', {
		controller: 'SermonCtrl as sermon',
		templateUrl: 'efg.sermonView.tpl.html'
    });
})

.controller('SermonCtrl', function() {
});