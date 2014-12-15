angular.module('efg.indexView', [
	'efg.mockService',
	'efg.regexFilter',
	'efg.componentDirective',
	'bootstrap.thumbnailDirective',
	'ng',
	'ngRoute'
])

.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'IndexCtrl as index',
		templateUrl: 'efg.indexView.tpl.html'
	});
})

.controller('IndexCtrl', function(mock, $log, $scope) {
	mock.get('/api/v1/group').then(angular.bind(this, function success(result) {
		this.groups = result;
	}));
	mock.get('/api/v1/member?fields=name,duties,img').then(angular.bind(this, function success(result) {
		this.members = result.map(function(member) {
			return {
				id: member.id,
				title: [member.name.givenname, member.name.familyname].join(' '),
				subtitle: member.duties.join(', '),
				img: member.img
			};
		});
	}));
	mock.get('/api/v1/event?limit=3').then(angular.bind(this, function success(result) {
		this.events = result;
	}));
	mock.get('/api/v1/next').then(angular.bind(this, function success(result) {
		this.next = result;
	}));
	mock.get('/api/v1/info').then(angular.bind(this, function success(result) {
		this.infos = result;
	}));
	mock.get('/api/v1/contact?fields=name,action,img').then(angular.bind(this, function success(result) {
		this.contacts = result.map(function(contact) {
			return {
				id: contact.id,
				title: contact.name,
				subtitle: contact.action,
				img: contact.img
			};
		});
	}));
});