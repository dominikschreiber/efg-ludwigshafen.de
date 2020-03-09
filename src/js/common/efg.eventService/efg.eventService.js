'use strict';

angular
  .module('efg.eventService', ['ng'])
  .factory('event', function($q, configurationApi) {
    function endswithignorecase(str, suffix) {
      return str &&
        str.toLowerCase().lastIndexOf(suffix.toLowerCase()) ===
          str.length - suffix.length;
    }

    function _unwrap(types, args) {
      var event = args[0];

      for (var type in types) {
        if (endswithignorecase(event.description, type)) {
          return {
            description: event.description.slice(0, -type.length),
            classname: types[type]
          };
        }
      }
      return {
        description: event.description,
        classname: types[Object.keys(types)[0]]
      };
    }

    function _types(types) {
      return Object.keys(types).reduce(
        function(result, key) {
          return result.concat([{title: key, classname: types[key]}]);
        },
        []
      );
    }

    function _promise(fn) {
      var deferred = $q.defer();

      if (!types) {
        configurationApi.get('event').then(
          function(conf) {
            types = conf.types;
            deferred.resolve(fn(types, [].slice.call(arguments, 1)));
          },
          deferred.reject
        );
      } else {
        deferred.resolve(fn(types, [].slice.call(arguments, 1)));
      }

      return deferred.promise;
    }

    /**
     * maps written suffixes to classnames,
     * e.g. "für Mitarbeiter" -> "is-internal"
     * @type {{suffix: string}}
     */
    var types;

    return {
      /**
         * @param {FullCalendar_Event} event as passed through by the fullcalendar
         * eventRender method
         * @return {{description: string, classname: string}} description+classname of the
         * unwrapped event
         */
      unwrap: function(event) {
        return _promise(_unwrap, event);
      },
      types: function() {
        return _promise(_types);
      }
    };
  });
