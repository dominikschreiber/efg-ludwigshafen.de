'use strict';

angular.module('efg.eventService', [
    'ng'
])

.factory('event', function($log) {
    function endswithignorecase(str, suffix) {
        return str && str.toLowerCase().lastIndexOf(suffix.toLowerCase()) === str.length - suffix.length;
    }
    
    /**
     * maps written suffixes to classnames,
     * e.g. "für Mitarbeiter" -> "is-internal"
     * @type {{suffix: string}}
     */
    var types = {
            'für alle': 'for-all',
            'für frauen': 'for-women',
            'für männer': 'for-men',
            'für kinder': 'for-kids',
            'für jugendliche': 'for-teens',
            'für senioren': 'for-seniors',
            'für mitarbeiter': 'internal'
        };
    
    return {
        /**
         * @param {FullCalendar_Event} event as passed through by the fullcalendar
         * eventRender method
         * @return {{description: string, classname: string}} description+classname of the
         * unwrapped event 
         */
        unwrap: function(event) {
            for (var type in types) {
                if (endswithignorecase(event.description, type)) {
                    $log.log(event);
                    return {
                        description: event.description.slice(0, - type.length),
                        classname: 'is-' + types[type]
                    };
                }
            }
            return {description: event.description, classname: ''};
        }
    };
});