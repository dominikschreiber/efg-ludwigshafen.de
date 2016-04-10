'use strict';

angular.module('bootstrap.thumbnailsDirective', [
	'bootstrap.thumbnailDirective',
	'ng'
])

.directive('thumbnails', function($log) {
	return {
		controller: function($scope) {
            function zip(a, b) {
                var result = [], i;
                
                if (a.length !== b.length) { throw new Error('arrays must be of same length!'); }
                for (i = 0; i < a.length; i++) {
                    result.push([a[i], b[i]]);
                }
                
                return result;
            }
            
			function createArray(item, times) {
				var arr = [];
				for (var i = 0; i < times; i++) {
					arr.push(item);
				}
				return arr;
			}

			function getclasses(itemCount, itemsPerLine, slug) {
				for (var i = 1; i <= itemsPerLine; i++) {
					if (itemCount === i) {
						return createArray('col-' + slug + '-' + (12/i), itemCount);
					}
				}
				return getclasses(itemsPerLine, itemsPerLine, slug).concat(getclasses(itemCount - itemsPerLine, itemsPerLine, slug));
			}

			function classes(itemcount) {
				return zip(getclasses(itemcount, 3, 'sm'), getclasses(itemcount, 4, 'md')).map(function(i) { return i.join(' '); });
			}

			var cls = classes($scope.items.length)
			  , i;

			for (i = 0; i < $scope.items.length; i++) {
				$scope.items[i] = angular.extend($scope.items[i], {cls: cls[i]});
			}
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