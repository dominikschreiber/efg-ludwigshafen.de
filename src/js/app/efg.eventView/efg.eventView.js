'use strict';

angular.module('efg.eventView', [
    'efg.headerbarService',
    'efg.eventService',
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

.controller('EventCtrl', function(uiCalendarConfig, headerbar, event, $filter, $scope, $log) {
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
            }.bind(this),
            eventRender: function(e, $element) {
                $element
                    .prop('title', e.title)
                    .addClass(event.unwrap(e).classname);
            }
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
        headerbar.update({
            id:headerIds[0],
            content: $filter('date')(new Date(), 'MMMM'),
            type: 'text'
        });
    };

    this.eventSources = [this.eventSource];

    var headerIds = headerbar
        .add(
        {
            type: 'text',
            content: $filter('date')(new Date(), 'MMMM')
        }, {
            action: this.previous,
            type: 'button',
            img: 'glyphicon glyphicon-menu-left'
        }, {
            action: this.today,
            type: 'button',
            content: 'heute'
        }, {
            action: this.next,
            type: 'button',
            img: 'glyphicon glyphicon-menu-right'
        });

    $scope.$on('$destroy', function() {
        headerbar.clear();
    });
});
