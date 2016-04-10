'use strict';

angular.module('efg.indexView', [
    'efg.serviceView',
    'efg.geoView',
    'efg.eventView',
    'efg.nextView',
    'efg.memberView',
    'efg.sermonView',
    'efg.contactView',
	'efg.componentDirective',
    'efg.headerlogoDirective',
    'efg.responsiveFilter',
	'ng',
	'ngRoute'
])

.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'IndexCtrl as index',
		templateUrl: 'efg.indexView.tpl.html'
	});
})

.controller('IndexCtrl', function($filter, $log) {
    /** @type {{String: String}} */
    var cache = {};
    
    /**
     * @param {String} imgurl
     * @return {{'background-image': String}}
     */
    this.dark = function(imgurl) {
        // ng runs into $rootScope:infdig (Infinite $digest Loop)
        // if a new object is created in every call => cache the
        // results and return the same references every time
        if (!(imgurl in cache)) {
            cache[imgurl] = {
                'background-image': 'linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url(' + $filter('responsive')(imgurl) + ')'
            };
        }
        return cache[imgurl];
    };
});