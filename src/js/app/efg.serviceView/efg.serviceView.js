'use strict';

angular.module('efg.serviceView', [
    'efg.serviceApi',
    'efg.trustFilter',
    'efg.sermonDirective',
    'efg.responsiveFilter',
    'hc.marked',
	'ng',
	'ngRoute'
])

.config(function($routeProvider) {
	$routeProvider.when('/service/:id', {
		controller: 'ServiceCtrl as service',
		templateUrl: 'efg.serviceView.tpl.html'
	});
})

.controller('ServiceCtrl', function(serviceApi, $routeParams, $filter) {
    this.$filter = $filter;

    serviceApi.get($routeParams.id).then(function success(result) {
		this.img = result.poster;
        this.title = result.name;
		this.subtitle = result.subtitle;
		this.description = result.description;
        this.sermon = result.sermon;
	}.bind(this));
})

.directive('servicepreview', function(serviceApi) {
    return {
        templateUrl: 'efg.servicePreview.tpl.html',
        scope: {
            classes: '@',
            styles: '='
        },
        controller: function($scope) {
            serviceApi.query().then(function(services) {
                $scope.services = Object.keys(services).map(function(key) {
                    var service = services[key];
                    return {
                        id: key,
                        title: service.name,
                        subtitle: [
                            service.schedule.day,
                            service.schedule.hours
                        ].join(', ')
                    };
                });
            });
        }
    }
});