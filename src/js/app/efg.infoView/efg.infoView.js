'use strict';

angular
  .module('efg.infoView', [
    'efg.infoApi',
    'ng'
  ])
  .directive('infopreview', function(infoApi) {
    return {
      templateUrl: 'efg.infoPreview.tpl.html',
      scope: {
        classes: '@'
      }
    }
  });