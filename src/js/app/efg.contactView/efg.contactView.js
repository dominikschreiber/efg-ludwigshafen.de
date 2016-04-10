'use strict';

angular.module('efg.contactView', [
    'efg.contactApi',
    'efg.trustFilter',
    'efg.responsiveFilter',
    'bootstrap.thumbnailsDirective',
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
})

.directive('contactpreview', function(contactApi) {
    return {
        templateUrl: 'efg.contactPreview.tpl.html',
        scope: {
            classes: '@',
            styles: '='
        },
        controller: function($scope) {
            contactApi.query().then(function(contacts) {
                $scope.contacts = Object.keys(contacts).map(function(key) {
                    var contact = contacts[key];
                    return {
                        id: contact.action,
                        title: contact.name,
                        img: contact.thumbnail
                    };
                });
            });
        }
    };
});
