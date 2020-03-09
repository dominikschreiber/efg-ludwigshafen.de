'use strict';

angular
  .module('efg.memberView', [
    'efg.memberApi',
    'efg.responsiveBackgroundDirective',
    'bootstrap.thumbnailsDirective',
    'ng',
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider.when('/member/:id', {
      controller: 'MemberCtrl as member',
      templateUrl: 'efg.memberView.tpl.html'
    });
  })
  .controller('MemberCtrl', function(memberApi, $routeParams, $filter) {
    this.$filter = $filter;

    memberApi.get($routeParams.id).then(
      function success(member) {
        this.title = [member.name.givenname, member.name.familyname].join(' ');
        this.subtitle = member.duties.join(', ');
        this.description = member.description;
        this.img = member.poster;
      }.bind(this)
    );
  })
  .directive('memberpreview', function(memberApi) {
    return {
      templateUrl: 'efg.memberPreview.tpl.html',
      scope: {
        classes: '@',
        background: '@',
        dark: '@'
      },
      controller: function($scope) {
        function create(member) {
          return {
            id: member.id,
            title: [member.name.givenname, member.name.familyname].join(' '),
            subtitle: member.duties.join(', '),
            img: member.img
          };
        }

        memberApi.query().then(function(members) {
          var key, member;

          for (key in members) {
            member = angular.extend(members[key], {id: key});
            $scope[member.isleader ? 'leaders' : 'members'].push(
              create(member)
            );
          }
        });

        $scope.members = [];
        $scope.leaders = [];
      }
    };
  });
