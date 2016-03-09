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
            'für alle': 'is-for-all',
            'für Frauen': 'is-for-women',
            'für Männer': 'is-for-men',
            'für Kinder': 'is-for-kids',
            'für Jugendliche': 'is-for-teens',
            'für Senioren': 'is-for-seniors',
            'für Mitarbeiter': 'is-internal'
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
                    return {
                        description: event.description.slice(0, - type.length),
                        classname: types[type]
                    };
                }
            }
            return {description: event.description, classname: types['für alle']};
        },
        types: function() {
            return Object.keys(types).reduce(function(result, key) {
                return result.concat([{title: key, classname: types[key]}]);
            }, []);
        }
    };
});