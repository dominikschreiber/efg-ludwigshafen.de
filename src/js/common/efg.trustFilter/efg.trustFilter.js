angular.module('efg.trustFilter', [
	'ng'
])

.filter('trustHtml', function($sce) {
	return $sce.trustAsHtml;
})

.filter('trustResource', function($sce) {
	return $sce.trustAsResourceUrl;
});