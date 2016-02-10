'use strict';

angular.module('efg.memberView', [
	'efg.memberApi',
    'efg.responsiveFilter',
	'ng',
	'ngRoute'
])

.config(function($routeProvider) {
	$routeProvider.when('/member/:id', {
		controller: 'MemberCtrl as member',
		templateUrl: 'efg.memberView.tpl.html'
	});
})

.controller('MemberCtrl', function(memberApi, $routeParams, $filter) {
    this.$filter = $filter;
    
	memberApi.get($routeParams.id).then(function success(member) {
		this.title = [
            member.name.givenname,
            member.name.familyname
        ].join(' ');
		this.subtitle = member.duties.join(', ');
		this.description = member.description;
		this.img = member.poster;
	}.bind(this));
});