'use strict';

angular
  .module('efg.groupView', [
    'efg.groupApi',
    'efg.componentDirective',
    'efg.responsiveBackgroundDirective',
    'hc.marked',
    'ng',
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider.when('/group/:id', {
      controller: 'GroupCtrl as group',
      templateUrl: 'efg.groupView.tpl.html'
    });
  })
  .controller('GroupCtrl', function(groupApi, $routeParams, $filter) {
    this.$filter = $filter;

    groupApi.get($routeParams.id).then(
      function success(group) {
        this.title = group.name;
        this.subtitle = [
          group.date,
          group.location && 'in der ' + group.location,
          group.target && 'für ' + group.target
        ]
          .filter(Boolean)
          .join(', ');
        this.img = group.poster;
        this.description = group.description;
      }.bind(this)
    );
  })
  .directive('grouppreview', function(groupApi) {
    return {
      templateUrl: 'efg.groupPreview.tpl.html',
      scope: {
        classes: '@',
        background: '@',
        dark: '@'
      },
      controller: function($scope) {
        groupApi.query().then(function(groups) {
          $scope.groups = Object.keys(groups).map(function(key) {
            return {
              id: key,
              title: groups[key].name,
              subtitle: groups[key].target,
              img: 'glyphicon ' + groups[key].icon
            };
          });
        });
      }
    };
  });
