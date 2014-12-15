angular.module('efg.trustFilter', [
	'ng'
])

.filter('trust', function($sce) {
	return $sce.trustAsHtml;
});