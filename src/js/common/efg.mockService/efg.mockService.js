'use strict';

angular.module('efg.mockService', [
	'ng'
])

.factory('mock', function($q, $log) {
	var mock = {
		'/api/v1/event?limit=3&fields=name,date,img': [
			{
				id: 'weihnachtsgottesdienst',
				name: 'Weihnachtsgottesdienst',
				date: [
					(new Date('2014/12/24 16:00')).getTime()
				],
				img: '//lorempixel.com/500/400/abstract/1'
			}, {
				id: 'allianzgebetswoche',
				name: 'Allianz Gebetswoche',
				date: [
					(new Date('2015/01/11 20:00')).getTime(),
					(new Date('2015/01/12 20:00')).getTime(),
					(new Date('2015/01/13 20:00')).getTime(),
					(new Date('2015/01/14 20:00')).getTime(),
					(new Date('2015/01/15 20:00')).getTime(),
					(new Date('2015/01/16 20:00')).getTime(),
					(new Date('2015/01/17 20:00')).getTime(),
					(new Date('2015/01/18 20:00')).getTime()
				],
				img: '//lorempixel.com/500/400/abstract/2'
			}, {
				id: 'endzeitbibelabende',
				name: 'Endzeit-Bibelabende',
				date: [
					(new Date('2015/01/27 20:00')).getTime(),
					(new Date('2015/02/03 20:00')).getTime(),
					(new Date('2015/02/10 20:00')).getTime()
				],
				img: '//lorempixel.com/500/400/abstract/3'
			}
		],
        '/api/v1/event/weihnachtsgottesdienst': {

        },
		'/api/v1/next?fields=name': [
			{id: 'service', name: 'Komm zu einem Gottesdienst'},
			{id: 'cellgroup', name: 'Besuch einen Hauskreis'},
			{id: 'help', name: 'Erhalte Hilfe'},
			{id: 'talents', name: 'Entdecke Deine Gaben'},
			{id: 'baptism', name: 'Werde Getauft'},
			{id: 'participate', name: 'Arbeite mit'}
		],
        '/api/v1/next/service': {
            name: 'Gottesdienst',
            description: 'Der erste Schritt: komm in Kontakt',
            img: '//lorempixel.com/1920/1080/city/2',
            content: '<h2>Komm in Kontakt</h2><p>Komm in Kontakt</p>'
        },
		'/api/v1/info': [
			{id: 'creed', title: 'Glaubensbekenntnis', subtitle: 'Was wir glauben', img: 'glyphicon glyphicon-fire'},
			{id: 'faq', title: 'Häufige Fragen', subtitle: undefined, img: 'glyphicon glyphicon-comment'}
		],
        '/api/v1/info/creed': {
            id: 'creed',
            name: 'Glaubensbekenntnis'
        },
		'/api/v1/contact?fields=name,action,img': [
			{id: 'phone', name: '+49 1577 8394600', action: 'tel:+4915778394600', img: 'glyphicon glyphicon-earphone'},
			{id: 'location', name: 'Böhlstraße 5, Ludwigshafen', action: '#!/findus', img: 'glyphicon glyphicon-map-marker'},
			{id: 'email', name: 'info@efg-ludwigshafen.de', action: 'mailto:info@efg-ludwigshafen.de', img: 'glyphicon glyphicon-envelope'}
		],
		'/api/v1/sermon?fields=name,date,series:(name,order),preacher:(name),source:(src,type)&limit=1': [{
			id: '2014-12-21',
			date: (new Date('2014/12/21 10:00')).getTime(),
			name: 'Zuversicht und Festigkeit -- Strophe 6',
			series: {
				id: 'wiesollichdichempfangen',
				name: 'Wie soll ich Dich empfangen',
				order: 3
			},
			preacher: {
				id: 'thomasweber',
				name: 'Thomas Weber'
			},
			source: [{
				src: 'http://www.efg-ludwigshafen.de/predigt/?show&file_name=201-41-21_T_Weber_Festigkeit_und_Zuversicht.mp3',
				type: 'audio/ogg'
			}, {
				src: 'http://www.efg-ludwigshafen.de/predigt/?show&file_name=201-41-21_T_Weber_Festigkeit_und_Zuversicht.mp3',
				type: 'audio/mpeg'
			}]
		}]
	};

	$log.log('consider implementing a backend, then replace mock with $http -- that should be it');
	return {
		get: function(url) {
			var deferred = $q.defer()
              , reason;

			if (mock.hasOwnProperty(url)) {
				deferred.resolve(mock[url]);
			} else {
                reason = url + ' not found in ' + _.keys(mock);
                $log.log(reason);
				deferred.reject(reason);
			}

			return deferred.promise;
		}
	};
});