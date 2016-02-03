'use strict';

angular.module('efg.contactView', [
    'efg.contactApi',
    'efg.trustFilter',
    'efg.responsiveFilter',
    'btford.markdown',
	'ng',
	'ngRoute'
])

.config(function($routeProvider) {
	$routeProvider.when('/contact/:id', {
		controller: 'ContactCtrl as contact',
		templateUrl: 'efg.contactView.tpl.html'
	});
})

.controller('ContactCtrl', function(contactApi, $routeParams, $filter) {
    this.$filter = $filter;
    
    contactApi.get($routeParams.id).then(function success(result) {
		this.img = result.poster;
        this.title = result.name;
		this.subtitle = result.subtitle;
		this.description = result.description;
	}.bind(this));
});
