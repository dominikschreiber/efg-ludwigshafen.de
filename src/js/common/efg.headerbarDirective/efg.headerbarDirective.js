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
