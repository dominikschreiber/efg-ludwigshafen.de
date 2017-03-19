'use strict';

angular
  .module('efg.downloadsView', ['efg.downloadsApi', 'ng', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider.when('/downloads', {
      controller: 'DownloadsCtrl as downloads',
      templateUrl: 'efg.downloadsView.tpl.html'
    });
  })
  .controller('DownloadsCtrl', function(downloadsApi) {
    downloadsApi.query().then(
      function(results) {
        this.items = results;
      }.bind(this)
    );

    this.getImageSrc = function(asset) {
      return /(png|jpe?g)$/.test(asset.ending)
        ? encodeURI(asset.url)
        : '//placehold.it/96?text=' + asset.ending.toUpperCase();
    };
  });
