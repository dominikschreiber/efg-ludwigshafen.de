angular.module('efg.componentDirective', [
	'ng'
])

.directive('component', function() {
	return {
		replace: true, // to allow style/ng-style
		restrict: 'E',
		scope: {
			header: '@',
			subheader: '@',
			classes: '@'
		},
		templateUrl: 'efg.componentDirective.tpl.html',
		transclude: true
	};
});