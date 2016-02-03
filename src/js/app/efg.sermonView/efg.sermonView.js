'use strict';

angular.module('efg.sermonView', [
    'efg.sermonsDirective',
    'efg.sermonService',
    'efg.playerService',
    'efg.responsiveFilter',
    'btford.markdown',
	'ng',
	'ngRoute'
])

.config(function ($routeProvider) {
    $routeProvider.when('/sermon', {
		controller: 'SermonCtrl as sermon',
		templateUrl: 'efg.sermonView.tpl.html'
    });
})

.controller('SermonCtrl', function(player, sermon, $scope, $filter, $log) {
    var defaultheaders
      , seek;
      
    this.$filter = $filter;

    // ----- header/subheader -----------------------------

    defaultheaders = function() {
        this.header = 'Unsere Predigten';
        this.subheader = 'Mitschnitte aus den letzten Gottesdiensten';
    }.bind(this);

    defaultheaders();

    $scope.$watch(sermon.get, function(sermon) {
        if (sermon) {
            this.header = sermon.name;
            this.subheader = sermon.preacher + ' \u2013 ' + $filter('date')(sermon.date, 'dd.MM.yyyy');
        } else {
            defaultheaders();
        }
    }.bind(this));

    // ----- play/pause -----------------------------------

    this.ispaused = true;
    $scope.$watch(player.ispaused, function(ispaused) {
        this.ispaused = ispaused;
    }.bind(this));

    this.playpause = function() { player.toggle(); };

    // ----- again/skip -----------------------------------

    seek = function(delta) {
        player.position(player.position().currenttime + delta);
        if (player.ispaused()) {
            player.play();
        }
    }.bind(this);

    this.frameduration = 10; // seconds

    this.again = function() {
        seek(-this.frameduration);
    }.bind(this);

    this.skip = function() {
        seek(this.frameduration);
    };

    // ----- progress -------------------------------------

    $scope.$on('player:timeupdate', function(event, update) {
        this.currenttime = update.currenttime;
        this.duration = update.duration;
    }.bind(this));
});