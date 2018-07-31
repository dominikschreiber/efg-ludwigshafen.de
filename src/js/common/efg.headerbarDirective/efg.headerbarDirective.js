'use strict';

angular
  .module('efg.headerbarDirective', [
    'efg.playerService',
    'efg.headerbarService',
    'efg.sermonService',
    'ng'
  ])
  .directive('headerbar', function(headerbar, player, sermon, $filter, $log) {
    return {
      templateUrl: 'efg.headerbarDirective.tpl.html',
      link: function($scope) {
        var initial = true;

        $scope.$watch(headerbar.query, function(items) {
          if (items) {
            $scope.leftitems = items;
          }
        });

        $scope.$watch(player.ispaused, function(paused) {
          $scope.playpause = {
            id: 'playpause',
            img: 'glyphicon glyphicon-' + (paused ? 'play' : 'pause'),
            action: player.toggle,
            type: 'button'
          };
        });

        $scope.$watch(sermon.get, function(s) {
          if (s) {
            $scope.sermon = s;
            player.reload();
            if (!initial) {
              player.play();
            }
            initial = false;
          }
        });

        function lpad(s, pad, len) {
          s = s.toString();
          while (s.length < len) {
            s = pad + s;
          }
          return s.slice(-len);
        }

        function formatSeconds(s) {
          return lpad(Math.floor(s / 60), '0', 2) + ':' + lpad(Math.floor(s % 60), '0', 2);
        }

        $scope.sermonpos = 0;
        $scope.sermoncurrenttime = '00:00';
        $scope.sermonduration = '00:00';
        $scope.$on('player:timeupdate', function (e, update) {
          if (update.duration > 0) {
            $scope.sermonpos = 100 * update.currenttime / update.duration;
            $scope.sermoncurrenttime = formatSeconds(update.currenttime);
            $scope.sermonduration = formatSeconds(update.duration);
          } else {
            $scope.sermonpos = 0;
            $scope.sermoncurrenttime = '00:00';
            $scope.sermonduration = '00:00';
          }
        });
      },
      transclude: true,
      replace: true
    };
  })
  .directive('headeraction', function() {
    return {
      templateUrl: 'efg.headeractionDirective.tpl.html',
      scope: {
        item: '='
      },
      transclude: true,
      replace: true
    };
  });
