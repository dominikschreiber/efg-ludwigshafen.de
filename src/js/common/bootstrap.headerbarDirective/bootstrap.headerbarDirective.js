angular.module('bootstrap.headerbarDirective', [
    'ng'
])

.directive('headerbar', function() {
    return {
        templateUrl: 'bootstrap.headerbarDirective.tpl.html',
        scope: {
            header: '@'
        },
        link: function($scope, $element, $attributes) {

        },
        transclude: true
    }
})

.directive('headeraction', function() {
    return {
        templateUrl: 'bootstrap.headeractionDirective.tpl.html',
        scope: {
            img: '@',
            header: '@',
            href: '@',
            click: '='
        },
        link: function($scope, $element, $attributes) {
        },
        transclude: true,
        replace: true
    }
});