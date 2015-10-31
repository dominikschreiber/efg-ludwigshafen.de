'use strict';

angular.module('efg.eventView', [
    'bootstrap.headerbarDirective',
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

.controller('EventCtrl', function(uiCalendarConfig) {
    /**
     * calls the fullCalendar api of the used calendar
     * with the given `method`.
     *
     * @param {string} method the fullCalendar api method
     */
    function fullCalendar(method) {
        return uiCalendarConfig.calendars.events.fullCalendar(method);
    }

    this.eventSource = {
        googleCalendarId: 'efg.ludwigshafen@gmail.com'
    };

    this.uiConfig = {
        calendar: {
            googleCalendarApiKey: 'AIzaSyAItn9V0gjivVppN6e0Ey5RviaMxtTuQ0U',
            header: {
                left: '',
                center: '',
                right: ''
            },
            timeFormat: 'H:mm',
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * .8,
            viewRender: function() {
                this.updateTitle();
            }.bind(this)
        }
    };

    this.today = function() {
        fullCalendar('today');
        this.updateTitle();
    }.bind(this);

    this.next = function() {
        fullCalendar('next');
        this.updateTitle();
    }.bind(this);

    this.previous = function() {
        fullCalendar('prev');
        this.updateTitle();
    }.bind(this);

    this.updateTitle = function() {
        this.title = fullCalendar('getDate')._d;
    };

    this.eventSources = [this.eventSource];
});
