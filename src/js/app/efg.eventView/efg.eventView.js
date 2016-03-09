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
    
    var headerIds;

    this.eventSource = {
        googleCalendarId: 'efg.ludwigshafen@gmail.com'
    };

    this.uiConfig = {
        calendar: {
            googleCalendarApiKey: 'AIzaSyAItn9V0gjivVppN6e0Ey5RviaMxtTuQ0U',
            header: false,
            timeFormat: 'H:mm',
            height: Math.max(
                Math.max(
                    document.documentElement.clientHeight, 
                    window.innerHeight || 0
                ) - 
                document.querySelector('.headerbar').scrollHeight -
                2 * parseInt(document.body.style.paddingBottom),
                0
            ),
            viewRender: function() {
                this.updateTitle();
            }.bind(this),
            eventRender: function(e, $element) {
                var unwrapped = event.unwrap(e)
                  , selectedTypes;
                
                $element
                    .prop('title', e.title)
                    .addClass(unwrapped.classname);
                
                if (this.selectedtypes.indexOf(unwrapped.classname) > -1) {
                    $element.addClass('is-selected');
                }
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
        headerbar.update({
            id: headerIds[0],
            content: $filter('date')(fullCalendar('getDate')._d, 'MMMM'),
            type: 'text'
        });
    };
    
    this.updateCalendar = function() {
        this.selectedtypes = this.getSelectedTypes();
        fullCalendar('rerenderEvents');
    };

    this.eventSources = [this.eventSource];
    this.eventfilters = event.types().map(function(type) {
        return angular.extend(type, {checked: true});
    });
    
    this.getSelectedTypes = function() {
        return (this.eventfilters || []).reduce(function(checkedClassnames, filter) {
            if (filter.checked) {
                return checkedClassnames.concat([filter.classname]);
            } else {
                return checkedClassnames;
            }
        }, []);
    };
    this.selectedtypes = this.getSelectedTypes();

    headerIds = headerbar
        .add({
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
