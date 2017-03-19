'use strict';

angular.module('efg.regexFilter', ['ng']).filter('regex', function($log) {
  return function(objects, regex, property) {
    var re = new RegExp(regex, 'g');
    return objects.filter(function(obj) {
      var str = property ? obj[property] : obj;
      if (str.match(re)) {
        return obj;
      }
    });
  };
});
