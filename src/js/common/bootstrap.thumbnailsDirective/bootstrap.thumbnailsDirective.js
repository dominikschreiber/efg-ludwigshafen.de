angular.module('bootstrap.thumbnailsDirective', [
	'bootstrap.thumbnailDirective',
	'ng'
])

.directive('thumbnails', function($log) {
	return {
		link: function($scope, $element, $attributes) {
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
				return _.zip(getclasses(itemcount, 3, 'sm'), getclasses(itemcount, 4, 'md')).map(function(i) { return i.join(' '); });
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