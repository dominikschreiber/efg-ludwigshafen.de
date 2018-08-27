'use strict';

angular
  .module('efg.headerbarDirective', [
    'efg.playerService',
    'efg.headerbarService',
    'efg.sermonService',
    'ng'
  ])
  .directive('headerbar', function(headerbar, player, sermon) {
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

        function updatePosition(e) {
          if ($progressbar) {
            $scope.currenttime = $scope.duration * e.pageX / $progressbar.offsetWidth;
            $progressbar.value = $scope.currenttime;
            
            e.preventDefault();
            e.stopPropagation();
          }
        }

        /** @type {boolean} */
        var seekStarted = false;
        /** @type {$<HTMLProgressElement>} */
        var $progressbar;
        $scope.startSeek = function (e) {
          seekStarted = true;
          $progressbar = $progressbar || e.target;
          updatePosition(e);
        };
        $(window)
          .on('mousemove', function (e) {
            if (seekStarted) {
              updatePosition(e);
            }
          })
          .on('mouseup', function (e) {
            if (seekStarted) {
              updatePosition(e);
              player.position($scope.currenttime);
              seekStarted = false;
            }
          });

        $scope.currenttime = 0;
        $scope.duration = 0;
        $scope.$on('player:timeupdate', function (e, update) {
          if (update.duration > 0) {
            $scope.currenttime = update.currenttime;
            $scope.duration = update.duration;
          } else {
            $scope.currenttime = 0;
            $scope.duration = 0;
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
