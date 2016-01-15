angular.module('efg.headerbarDirective', [
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

            $scope.$watch(function() { return headerbar.title(); }, function(title) {
                if (title !== undefined) {
                    $scope.header = title;
                }
            });
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
        transclude: true
    }
})

.directive('headeraction', function() {
    return {
        templateUrl: 'efg.headeractionDirective.tpl.html',
        scope: {
            item: '=',
        },
        transclude: true,
        replace: true
    }
});
