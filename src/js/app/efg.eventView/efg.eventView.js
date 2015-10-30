'use strict';

angular.module('efg.eventView', [
    'ui.calendar',
    'ng',
    'ngRoute'
])

.config(function ($routeProvider) {
    $routeProvider.when('/event', {
        controller: 'EventCtrl as event',
        templateUrl: 'efg.eventView.tpl.html'
    });
})

.controller('EventCtrl', function (uiCalendarConfig) {
    this.eventsF = function (start, end, timezone, callback) {
        var eventArr = [];
        callback(eventArr);
    };
    this.eventSource = {
        googleCalendarId: 'efg.ludwigshafen@gmail.com'
    };
    this.calendar = {
        googleCalendarApiKey: 'AIzaSyAItn9V0gjivVppN6e0Ey5RviaMxtTuQ0U'
    };
    
    this.eventSources = [this.eventSource];
});