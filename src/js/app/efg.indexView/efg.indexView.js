'use strict';

angular.module('efg.indexView', [
    'efg.contactApi',
    'efg.nextApi',
    'efg.memberApi',
    'efg.serviceApi',
    'efg.groupApi',
    'efg.infoApi',
    'efg.eventApi',
	'efg.sermonApi',
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

.controller('IndexCtrl', function(eventApi, infoApi, contactApi, nextApi, memberApi, serviceApi, groupApi, sermonApi, $http, $log, $filter) {
	this.$filter = $filter;

	serviceApi.query().then(function(services) {
		this.services = Object.keys(services).map(function(key) {
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
	}.bind(this));
	groupApi.query().then(function(groups) {
        this.groups = Object.keys(groups).map(function(key) {
            var group = groups[key];
            return {
                id: key,
                title: group.name,
                subtitle: group.category,
                img: group.thumbnail
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
	eventApi.query().then(function(events) {
		this.events = Object.keys(events).map(function(key) {
            var event = events[key];
			return {
				id: key,
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
				img: event.thumbnail
			};
		});
	}.bind(this));
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
	infoApi.query().then(function(infos) {
		this.infos = Object.keys(infos).map(function(key) {
            var info = infos[key];
            return {
                id: key,
                title: info.name,
                subtitle: info.subtitle,
                img: info.thumbnail
            };
        });
	}.bind(this));
    sermonApi.query().then(function(sermons) {
		this.sermon = sermons[Object.keys(sermons)[0]];
	}.bind(this));
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