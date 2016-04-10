'use strict';

angular.module('efg.nextView', [
    'efg.nextApi',
    'efg.responsiveFilter',
    'btford.markdown',
    'ngRoute'
])

.config(function($routeProvider) {
    $routeProvider.when('/next/:id', {
        controller: 'NextCtrl as next',
        templateUrl: 'efg.nextView.tpl.html'
    });
})

.controller('NextCtrl', function(nextApi, $routeParams, $filter) {
    this.$filter = $filter;
    
    nextApi.get($routeParams.id).then(function(action) {
        this.title = action.name;
        this.subtitle = action.subtitle;
        this.img = action.poster;
        this.content = action.description;
    }.bind(this));
})

.directive('nextpreview', function(nextApi, $filter) {
    return {
        templateUrl: 'efg.nextPreview.tpl.html',
        scope: {
            classes: '@',
            styles: '='
        },
        controller: function($scope) {
            $scope.responsive = $filter('responsive');
            
            nextApi.query().then(function(actions) {
                $scope.actions = Object.keys(actions).map(function(key) {
                    var words = actions[key].action.split(' ');
                    
                    return {
                        id: key,
                        title: words[words.length - 1],
                        subtitle: words.slice(0, -1).join(' ')
                    };
                });
            });
        }
    }
});