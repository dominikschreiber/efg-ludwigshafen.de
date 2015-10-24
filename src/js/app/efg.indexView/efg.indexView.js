'use strict';

angular.module('efg.indexView', [
    'efg.serviceApi',
    'efg.groupApi',
	'efg.mockService',
	'efg.componentDirective',
    'efg.sermonDirective',
	'bootstrap.thumbnailDirective',
	'bootstrap.thumbnailsDirective',
	'ng',
	'ngRoute'
])

.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'IndexCtrl as index',
		templateUrl: 'efg.indexView.tpl.html'
	});
})

.controller('IndexCtrl', function(serviceApi, groupApi, mock, $http, $log, $filter) {
	this.$filter = $filter;

	serviceApi.query().then(function success(services) {
		this.services = Object.keys(services).map(function(id) {
            return {
                id: id,
                title: services[id].name,
                subtitle: [
                    services[id].schedule.day,
                    services[id].schedule.hours
                ].join(', ')
            };
        });
	}.bind(this));
	groupApi.query().then(function success(groups) {
        this.groups = Object.keys(groups).map(function(id) {
            return {
                id: id,
                title: groups[id].name,
                subtitle: groups[id].category,
                img: groups[id].thumbnail
            };
        });
	}.bind(this));
	mock.get('/api/v1/member?fields=name,duties,img').then(angular.bind(this, function success(result) {
		function createMember(member) {
				return {
					id: member.id,
					title: [member.name.givenname, member.name.familyname].join(' '),
					subtitle: member.duties.join(', '),
					img: member.img
				};
			}

		this.members = _.chain(result)
			.filter(function(member) {
				return member.duties.indexOf('Ältester') === -1;
			})
			.map(createMember)
            .value();

		this.elders = _.chain(result)
			.filter(function(member) {
				return member.duties.indexOf('Ältester') > -1;
			})
			.map(createMember)
            .value();
	}));
	mock.get('/api/v1/event?limit=3&fields=name,date,img').then(angular.bind(this, function success(result) {
		this.events = _.map(result, function(event) {
			return {
				id: event.id,
				title: event.name,
				subtitle: (event.date.length > 1) ?
					event.date
						.reduce(function(prev, now) {
							var min = prev[0]
							  , max = prev[1];

							if (now < min) { min = now; }
							if (now > max) { max = now; }

							return [min, max];
						}, [Number.MAX_VALUE, Number.MIN_VALUE])
						.map(function(date) {
							return $filter('date')(new Date(date), 'd. MMMM');
						})
						.join(' bis ') :
					$filter('date')(new Date(event.date[0]), 'd. MMMM HH:mm'),
				img: event.img
			};
		});
	}));
	mock.get('/api/v1/next?fields=name').then(angular.bind(this, function success(result) {
		this.next = _.map(result, function(action) {
            var words = action.name.split(' ');

            return {
                id: action.id,
                title: _.last(words),
                subtitle: _.initial(words).join(' ')
            };
        });
	}));
	mock.get('/api/v1/info').then(angular.bind(this, function success(result) {
		this.infos = result;
	}));
    mock.get('/api/v1/sermon?fields=name,date,series:(name,order),preacher:(name),source:(src,type)&limit=1').then(angular.bind(this, function success(result) {
		this.sermon = result[0];
	}));
	mock.get('/api/v1/contact?fields=name,action,img').then(angular.bind(this, function success(result) {
		this.contacts = _.map(result, function(contact) {
			return {
				id: contact.action,
				title: contact.name,
				img: contact.img
			};
		});
	}));
});