'use strict';

angular
  .module('efg.sermonView', [
    'efg.sermonsDirective',
    'efg.sermonService',
    'efg.sermonApi',
    'efg.playerService',
    'efg.responsiveBackgroundDirective',
    'hc.marked',
    'ng',
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider.when('/sermon', {
      controller: 'SermonCtrl as sermon',
      templateUrl: 'efg.sermonView.tpl.html'
    });
    $routeProvider.when('/sermon/:id', {
      controller: 'SermonCtrl as sermon',
      templateUrl: 'efg.sermonView.tpl.html'
    });
  })
  .controller('SermonCtrl', function(player, sermon, sermonApi, $window, $scope, $filter, $routeParams) {
    var defaultheaders, seek;

    // ----- header/subheader -----------------------------

    defaultheaders = function() {
      this.header = 'Unsere Predigten';
      this.subheader = 'Mitschnitte aus den letzten Gottesdiensten';
    }.bind(this);

    defaultheaders();

    $scope.$watch(
      sermon.get,
      function(sermon) {
        if (sermon) {
          this.header = sermon.name;
          this.subheader = sermon.preacher +
            ' \u2013 ' +
            $filter('date')(sermon.date, 'dd.MM.yyyy');
          this.src = sermon.source.src;
        } else {
          defaultheaders();
        }
      }.bind(this)
    );

    // ----- play/pause -----------------------------------

    this.ispaused = true;
    $scope.$watch(
      player.ispaused,
      function(ispaused) {
        this.ispaused = ispaused;
      }.bind(this)
    );

    this.playpause = function() {
      player.toggle();
    };

    // ----- again/skip -----------------------------------

    seek = function(delta) {
      player.position(player.position().currenttime + delta);
      if (player.ispaused()) {
        player.play();
      }
    }.bind(this);

    this.frameduration = 10; // seconds

    this.again = function() {
      seek(-this.frameduration);
    }.bind(this);

    this.skip = function() {
      seek(this.frameduration);
    };

    // ----- progress -------------------------------------

    $scope.$on(
      'player:timeupdate',
      function(event, update) {
        this.currenttime = update.currenttime;
        this.duration = update.duration;
      }.bind(this)
    );

    // ----- direct link ----------------------------------

    if ($routeParams.id) {
      sermonApi.query().then(function (sermons) {
        for (var i = 0; i < sermons.length; i++) {
          if (sermons[i].filename === $routeParams.id) {
            sermon.set(sermons[i]);
            return;
          }
        }
        $window.location.hash = '!/sermon';
      });
    }
  })
  .directive('sermonpreview', function(sermonApi) {
    return {
      templateUrl: 'efg.sermonPreview.tpl.html',
      scope: {
        classes: '@',
        background: '@',
        dark: '@'
      }
    };
  });
