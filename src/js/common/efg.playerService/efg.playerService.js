angular.module('efg.playerService', [
    'efg.sermonService',
    'ng'
])

.factory('player', function(sermon) {
    var audio = document.createElement('audio');

    document.body.appendChild(audio);

    return {
        toggle: function() {
            audio.paused ? audio.play() : audio.pause();
        },
        play: function() {
            audio.play();
        },
        isPaused: function() {
            return audio.paused;
        },
        reload: function() {
            var current = sermon.get();

            audio.src = current.source.src;
        }
    }
});