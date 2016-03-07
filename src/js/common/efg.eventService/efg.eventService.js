'use strict';

angular.module('efg.eventService', [
    'ng'
])

.factory('event', function($log) {
    function endswith(str, suffix) {
        return str && str.lastIndexOf(suffix) === str.length - suffix.length;
    }
    
    /**
     * maps written suffixes to classnames,
     * e.g. "für Mitarbeiter" -> "is-internal"
     * @type {{suffix: string}}
     */
    var types = {
            'für Alle': 'for-all',
            'für Frauen': 'for-women',
            'für Männer': 'for-men',
            'für Kinder': 'for-kids',
            'für Jugendliche': 'for-teens',
            'für Mitarbeiter': 'internal'
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
                if (endswith(event.description, type)) {
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