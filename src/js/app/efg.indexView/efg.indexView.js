'use strict';

angular.module('efg.indexView', [
    'efg.contactApi',
    'efg.nextApi',
    'efg.memberApi',
    'efg.serviceApi',
    'efg.groupApi',
    'efg.infoApi',
	'efg.sermonApi',
	'efg.componentDirective',
    'efg.headerlogoDirective',
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

.controller('IndexCtrl', function(infoApi, contactApi, nextApi, memberApi, serviceApi, groupApi, sermonApi, $log, $filter) {
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
            var member = _.extend(members[key], {id: key});
            if (member.duties.indexOf('Ältester') === -1) {
                all.push(createMember(member));
            }
            return all;
        }, []);

		this.elders = Object.keys(members).reduce(function(all, key) {
            var member = _.extend(members[key], {id: key});
            if (member.duties.indexOf('Ältester') > -1) {
                all.push(createMember(member));
            }
            return all;
        }, []);
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
    sermonApi.get(0).then(function(sermon) {
		this.sermon = sermon;
        this.showSermons = true;
	}.bind(this), function(reason) {
        $log.log(reason);
        this.showSermons = false;
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