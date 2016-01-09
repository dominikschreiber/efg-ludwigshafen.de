'use strict';

angular.module('efg.eventView', [
    'efg.headerbarService',
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

.controller('EventCtrl', function(uiCalendarConfig, headerbar, $filter, $scope) {
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
            header: false,
            timeFormat: 'H:mm',
            height: Math.max(
                Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - document.querySelector('.headerbar').scrollHeight,
                0
            ),
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
        headerbar.title($filter('date')(fullCalendar('getDate')._d, 'MMMM'));
    };

    this.eventSources = [this.eventSource];

    headerbar
        .title($filter('date')(new Date(), 'MMMM'))
        .add({
            id: 'previous',
            click: this.previous,
            img: 'glyphicon glyphicon-menu-left'
        }, {
            id: 'today',
            click: this.today,
            content: 'heute'
        }, {
            id: 'next',
            click: this.next,
            img: 'glyphicon glyphicon-menu-right'
        });

    $scope.$on('$destroy', function() {
        headerbar.clear();
        headerbar.title('');
    });
});
