'use strict';

angular.module('efg.playerService', [
    'efg.sermonService',
    'ng'
])

.factory('player', function(sermon, $rootScope, $log) {
    var audio = document.createElement('audio');

    document.body.appendChild(audio);

    audio.addEventListener('timeupdate', function(t) {
        $rootScope.$apply(function() {
            $rootScope.$broadcast('player:timeupdate', t.target.currentTime / t.target.duration);
        });
    });

    return {
        toggle: function() {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        },
        play: function() {
            audio.play();
        },
        isPaused: function() {
            return audio.paused;
        },
        position: function(position) {
            if (position) {
                audio.currentTime = audio.duration * position;
            }
            return audio.currentTime / audio.duration;
        },
        reload: function() {
            audio.src = sermon.get().source.src;
        }
    };
});