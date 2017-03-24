'use strict';

angular
  .module('efg.responsiveService', ['ng'])
  .factory('responsive', function() {
    var assetprefix = '/assets/img/';
    return {
      assetprefix: assetprefix,
      isimage: function(path) {
        return /\.(jpg|jpeg|png|gif)$/.test(path);
      },
      isasset: function(path) {
        return path.indexOf(assetprefix) === 0;
      }
    };
  });
