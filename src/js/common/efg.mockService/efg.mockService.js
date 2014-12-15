angular.module('efg.mockService', [
	'ng'
])

.factory('mock', function($q, $log, $window) {
	var mock = {
		'/api/v1/group': [
			{id: 'family', title: 'Familie', subtitle: '0 bis 6 Jahre', img: 'glyphicon glyphicon-user'},
			{id: 'kids', title: 'Kinder', subtitle: '7 bis 12 Jahre', img: 'glyphicon glyphicon-user'},
			{id: 'teens', title: 'Teens', subtitle: '13 bis 16 Jahre', img: 'glyphicon glyphicon-user'},
			{id: 'youth', title: 'Jugendliche', subtitle: '17 bis 21 Jahre', img: 'glyphicon glyphicon-user'},
			{id: 'young-adults', title: 'Junge Erwachsene', subtitle: '22 bis 35 Jahre', img: 'glyphicon glyphicon-user'},
			{id: 'women', title: 'Frauen', subtitle: 'Frauen', img: 'glyphicon glyphicon-user'},
			{id: 'men', title: 'Männer', subtitle: 'Männer', img: 'glyphicon glyphicon-user'},
			{id: 'seniors', title: 'Senioren', subtitle: 'über 60 Jahre', img: 'glyphicon glyphicon-user'}
		],
		'/api/v1/member?fields=name,duties,img':  [
			{
				id: 'wilfried',
				name: {
					givenname: 'Wilfried',
					familyname: 'Schmitt'
				},
				duties: ['Gemeindeleiter', 'Ältester'],
				img: 'glyphicon glyphicon-user'
			}, {
				id: 'thomas',
				name: {
					givenname: 'Thomas',
					familyname: 'Weber'
				},
				duties: ['Ältester'],
				img: 'glyphicon glyphicon-user'
			}, {
				id: 'denise',
				name: {
					givenname: 'Denise',
					familyname: 'Schmutz'
				},
				duties: ['Raumbuchung', 'Kranke'],
				img: 'glyphicon glyphicon-user'
			}, {
				id: 'andreas',
				name: {
					givenname: 'Andreas',
					familyname: 'Petry'
				},
				duties: ['Lehre', 'Gebet'],
				img: 'glyphicon glyphicon-user'
			}, {
				id: 'daniel',
				name: {
					givenname: 'Daniel',
					familyname: 'Mertins'
				},
				duties: ['Gottesdienst'],
				img: 'glyphicon glyphicon-user'
			}, {
				id: 'jonas',
				name: {
					givenname: 'Jonas',
					familyname: 'Weber'
				},
				duties: ['Jugendarbeit', 'Hauskreise'],
				img: 'glyphicon glyphicon-user'
			}
		],
		'/api/v1/member/wilfried?fields=name,duties,description,poster': {
			id: 'wilfried',
			name: {
				givenname: 'Wilfried',
				familyname: 'Schmitt'
			},
			duties: ['Gemeindeleiter', 'Ältester'],
			description: 'Seit der Gemeindegründung dabei. Der Hirte.',
			poster: 'http://lorempixel.com/' + $window.innerWidth + '/' + $window.innerHeight + '/people'
		},
		'/api/v1/member/thomas?fields=name,duties,description,poster': {
			id: 'thomas',
			name: {
				givenname: 'Thomas',
				familyname: 'Weber'
			},
			duties: ['Ältester'],
			description: 'Seit 2 Jahren Ältester. Der Macher.',
			poster: 'http://lorempixel.com/' + $window.innerWidth + '/' + $window.innerHeight + '/people'
		},
		'/api/v1/member/denise?fields=name,duties,description,poster': {
			id: 'denise',
			name: {
				givenname: 'Denise',
				familyname: 'Schmutz'
			},
			duties: ['Raumbuchung', 'Kranke'],
			description: 'lorem ipsum dolor sit amet',
			poster: 'http://lorempixel.com/' + $window.innerWidth + '/' + $window.innerHeight + '/people'
		},
		'/api/v1/member/andreas?fields=name,duties,description,poster': {
			id: 'andreas',
			name: {
				givenname: 'Andreas',
				familyname: 'Petry'
			},
			duties: ['Lehre', 'Gebet'],
			description: 'lorem ipsum dolor sit amet',
			poster: 'http://lorempixel.com/' + $window.innerWidth + '/' + $window.innerHeight + '/people'
		},
		'/api/v1/member/daniel?fields=name,duties,description,poster': {
			id: 'daniel',
			name: {
				givenname: 'Daniel',
				familyname: 'Mertins'
			},
			duties: ['Gottesdienst'],
			description: 'lorem ipsum dolor sit amet',
			poster: 'http://lorempixel.com/' + $window.innerWidth + '/' + $window.innerHeight + '/people'
		},
		'/api/v1/member/jonas?fields=name,duties,description,poster': {
			id: 'jonas',
			name: {
				givenname: 'Jonas',
				familyname: 'Weber'
			},
			duties: ['Jugendarbeit', 'Hauskreise'],
			description: 'lorem ipsum dolor sit amet',
			poster: 'http://lorempixel.com/' + $window.innerWidth + '/' + $window.innerHeight + '/people'
		},
		'/api/v1/event?limit=3': [
			{id: 'weihnachtsgottesdienst', title: 'Weihnachtsgottesdienst', subtitle: '24. Dezember, 16:00 Uhr', img: 'img/christmas-tree.jpg'},
			{id: 'allianzgebetswoche', title: 'Allianz Gebetswoche', subtitle: '11. bis 18. Januar', img: 'img/church-windows.jpg'},
			{id: 'endzeitbibelabende', title: 'Endzeit-Bibelabende', subtitle: '27. Januar bis 10. Februar', img: 'img/beach-fire.jpg'}
		],
		'/api/v1/next': [
			{id: 'service', title: 'Gottesdienst', subtitle: 'Komm zu einem'},
			{id: 'cellgroup', title: 'Hauskreis', subtitle: 'Besuch einen'},
			{id: 'help', title: 'Hilfe', subtitle: 'Erhalte'},
			{id: 'talents', title: 'Gaben', subtitle: 'Entdecke Deine'},
			{id: 'baptism', title: 'Getauft', subtitle: 'Werde'},
			{id: 'participate', title: 'mit', subtitle: 'Arbeite'}
		],
		'/api/v1/info': [
			{id: 'creed', title: 'Glaubensbekenntnis', subtitle: 'Was wir glauben', img: 'glyphicon glyphicon-fire'},
			{id: 'faq', title: 'Häufige Fragen', subtitle: undefined, img: 'glyphicon glyphicon-comment'}
		],
		'/api/v1/contact?fields=name,action,img': [
			{id: 'phone', name: '+49 1577 8394600', action: 'tel:+4915778394600', img: 'glyphicon glyphicon-earphone'},
			{id: 'location', name: 'Böhlstraße 5, Ludwigshafen', action: '#!/findus', img: 'glyphicon glyphicon-map-marker'},
			{id: 'email', name: 'info@efg-ludwigshafen.de', action: 'mailto:info@efg-ludwigshafen.de', img: 'glyphicon glyphicon-envelope'}
		],
		'/api/v1/service/sunday': {
			title: 'Sonntagmorgen-Gottesdienst',
			subtitle: 'Jung und Alt, Groß und Klein. Gemeinsam vor Gott'
		},
		'/api/v1/service/worship': {
			title: 'Lobpreis-Gottesdienst',
			subtitle: 'Musik. Gebet. Anbetung.'
		}
	};
	
	$log.debug('consider implementing a backend, then replace mock with $http -- that should be it');
	return {
		get: function(url) {
			var deferred = $q.defer();
			
			if (mock.hasOwnProperty(url)) {
				deferred.resolve(mock[url]);
			} else {
				deferred.reject(url + ' not found in ' + Object.keys(mock));
			}
			
			return deferred.promise;
		}
	};
});