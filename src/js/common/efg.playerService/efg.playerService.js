'use strict';

angular.module('efg.playerService', [
    'efg.sermonService',
    'ng'
])

.factory('player', function(sermon, $rootScope, $log) {
    function position(audio) {
        return {
            currenttime: audio.currentTime,
            duration: audio.duration
        };
    }

    var audio = document.createElement('audio');

    document.body.appendChild(audio);

    audio.addEventListener('timeupdate', function(t) {
        $rootScope.$apply(function() {
            $rootScope.$broadcast('player:timeupdate', position(t.target));
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
        ispaused: function() {
            return audio.paused;
        },
        position: function(p) {
            if (p) {
                audio.currentTime = Math.min(Math.max(p, 0), audio.duration);
            }
            return position(audio);
        },
        reload: function() {
            audio.src = sermon.get().source.src;
        }
    };
});