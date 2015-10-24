'use strict';

angular.module('efg.indexView', [
    'efg.contactApi',
    'efg.nextApi',
    'efg.memberApi',
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

.controller('IndexCtrl', function(contactApi, nextApi, memberApi, serviceApi, groupApi, mock, $http, $log, $filter) {
	this.$filter = $filter;

	serviceApi.query().then(function(services) {
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
	groupApi.query().then(function(groups) {
        this.groups = Object.keys(groups).map(function(id) {
            return {
                id: id,
                title: groups[id].name,
                subtitle: groups[id].category,
                img: groups[id].thumbnail
            };
        });
	}.bind(this));
	memberApi.query().then(function(members) {
		function createMember(member) {
				return {
					id: member.id,
					title: [
                        member.name.givenname,
                        member.name.familyname
                    ].join(' '),
					subtitle: member.duties.join(', '),
					img: member.img
				};
			}

		this.members = Object.keys(members).reduce(function(all, key) {
            var member = members[key];
            if (member.duties.indexOf('Ältester') === -1) {
                all.push(createMember(member));
            }
            return all;
        }, []);

		this.elders = Object.keys(members).reduce(function(all, key) {
            var member = members[key];
            if (member.duties.indexOf('Ältester') > -1) {
                all.push(createMember(member));
            }
            return all;
        }, []);
	}.bind(this));
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
	nextApi.query().then(function(actions) {
		this.next = Object.keys(actions).map(function(key) {
            var words = actions[key].action.split(' ');

            return {
                id: key,
                title: _.last(words),
                subtitle: _.initial(words).join(' ')
            };
        });
	}.bind(this));
	mock.get('/api/v1/info').then(angular.bind(this, function success(result) {
		this.infos = result;
	}));
    mock.get('/api/v1/sermon?fields=name,date,series:(name,order),preacher:(name),source:(src,type)&limit=1').then(angular.bind(this, function success(result) {
		this.sermon = result[0];
	}));
	contactApi.query().then(function(contacts) {
		this.contacts = Object.keys(contacts).map(function(key) {
            var contact = contacts[key];
			return {
				id: contact.action,
				title: contact.name,
				img: contact.thumbnail
			};
		});
	}.bind(this));
});