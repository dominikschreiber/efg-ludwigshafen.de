'use strict';

angular.module('efg.sermonView', [
    'efg.sermonApi',
    'bootstrap.headerbarDirective',
    'btford.markdown',
    'efg.sermonDirective',
	'ng',
	'ngRoute'
])

.config(function ($routeProvider) {
    $routeProvider.when('/sermon', {
		controller: 'SermonCtrl as sermon',
		templateUrl: 'efg.sermonView.tpl.html'
    });
})

.controller('SermonCtrl', function($http,sermonApi) {
   sermonApi.query().then(function success(result) {
       this.sermons = result;
	}.bind(this));
});