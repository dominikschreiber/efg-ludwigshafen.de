'use strict';

angular.module('efg.headerbarDirective', [
    'efg.playerService',
    'efg.headerbarService',
    'efg.sermonService',
    'ng'
])

.directive('headerbar', function(headerbar, player, sermon, $window, $log) {
    return {
        templateUrl: 'efg.headerbarDirective.tpl.html',
        link: function($scope) {
            var initial = true;

            $scope.$watch(headerbar.query, function(items) {
                if (items) {
                    $scope.leftitems = items;
                }
            });

            $scope.$watch(player.isPaused, function(paused) {
                $scope.playpause = {
                    id: 'playpause',
                    img: 'glyphicon glyphicon-' + (paused ? 'play' : 'pause'),
                    action: player.toggle,
                    type: 'button'
                };
            });

            $scope.position = 0;
            $scope.$on('player:timeupdate', function(event, position) {
                $log.log(position, $scope.fullwidth);
                $scope.position = position * $scope.fullwidth;
            });

            $scope.fullwidth = $window.innerWidth;
            $scope.$watch(function() { return $window.innerWidth; }, function(width) {
                $scope.fullwidth = width;
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
        },
        transclude: true,
        replace: true
    };
})

.directive('headeraction', function() {
    return {
        templateUrl: 'efg.headeractionDirective.tpl.html',
        scope: {
            item: '=',
        },
        transclude: true,
        replace: true
    };
});
