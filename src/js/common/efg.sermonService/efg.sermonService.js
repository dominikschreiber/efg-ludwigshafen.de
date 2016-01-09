angular.module('efg.sermonService', [
    'efg.sermonApi',
    'ng'
])

.factory('sermon', function(sermonApi) {
    var sermon;

    sermonApi.get(0).then(function(s) {
        if (!sermon) {
            sermon = s;
        }
    });

    return {
        is: function(s) {
            return sermon === s;
        },
        set: function(s) {
            sermon = s;
        },
        get: function() {
            return sermon;
        }
    }
});