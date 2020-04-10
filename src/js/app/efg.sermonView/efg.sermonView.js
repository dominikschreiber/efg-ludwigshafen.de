'use strict';

angular
  .module('efg.sermonView', ['ng'])
  .directive('sermonpreview', function() {
    return {
      templateUrl: 'efg.sermonPreview.tpl.html',
      replace: true
    };
  });
