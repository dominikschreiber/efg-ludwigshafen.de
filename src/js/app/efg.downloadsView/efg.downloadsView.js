'use strict';

angular
  .module('efg.downloadsView', ['ng', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider.when('/downloads', {
      controller: 'DownloadsCtrl as downloads',
      templateUrl: 'efg.downloadsView.tpl.html'
    });
  })
  .controller('DownloadsCtrl', function() {
    this.items = [{
      url: '/assets/downloads/2020-10-04 Arbeitsanweisung Dankbarkeit.pdf',
      title: '2020-10-04 Arbeitsanweisung Dankbarkeit',
      ending: 'pdf'
    }, {
      url: '/assets/downloads/2020-11-29 Bibelstellen zur Predigt.pdf',
      title: '2020-11-29 Bibelstellen zur Predigt',
      ending: 'pdf'
    }];

    this.getImageSrc = function(asset) {
      return /(png|jpe?g)$/.test(asset.ending)
        ? encodeURI(asset.url)
        : '//placehold.it/96?text=' + asset.ending.toUpperCase();
    };
  });
