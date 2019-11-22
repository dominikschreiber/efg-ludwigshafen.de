'use strict';

angular
  .module('bootstrap.thumbnailsDirective', [
    'bootstrap.thumbnailDirective',
    'ng'
  ])
  .directive('thumbnails', function($log) {
    return {
      controller: function($scope) {
        $scope.items.forEach(function ($item, i, $items) {
          /** @type {number} */
          var len = $items.length;
          /** @type {number} */
          var remaining = len - i - 1;
          /** @type {number}  */
          var lg = 12 / Math.max(1, remaining < len % 4 ? len % 4 : 4);
          /** @type {number}  */
          var md = 12 / Math.max(1, remaining < len % 3 ? len % 3 : 3);
          /** @type {number}  */
          var sm = 12 / Math.max(1, remaining < len % 3 ? len % 3 : 3);

          console.log('item:', $item.id, 'i:', i, 'len:', len, 'remaining:', remaining, 'lg:', lg, 'md:', md, 'sm:', sm);

          angular.extend($item, {
            cls: 'col-sm-' + sm + ' col-md-' + md + ' col-lg-' + lg
          });
        });
      },
      restrict: 'E',
      scope: {
        items: '=',
        itemstyle: '@',
        base: '@',
        imgclass: '@'
      },
      templateUrl: 'bootstrap.thumbnailsDirective.tpl.html'
    };
  });
