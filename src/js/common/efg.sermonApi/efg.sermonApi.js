'use strict';

angular.module('efg.sermonApi', [
    'ng'
])

.factory('sermonApi', ['$q', '$http', function($q, $http) {
    var cache
      , host = 'cloud.efg-ludwigshafen.de'
      , sharedfolder = 'bq1QQFmNVLVoE8p';

    // parse filename to sermon object, e.g.
    //
    //     2015-11-08_Preacher-Name_Sermon-title_Sermon-series_n.mp3
    //     =>
    //     {
    //         filename: '2015-...mp3',
    //         preacher: { name: 'Preacher Name' },
    //         source: { type: 'audio/mp3', src: '...' },
    //         name: 'Sermon title',
    //         series: 'Sermon series',
    //         episode: parseInt('n'),
    //         date: new Date('2015-11-08')
    //     }
    function init() {
        var deferred = $q.defer();

        if (!cache) {
            $http.get('http://' + host + '/index.php/apps/files_sharing/ajax/list.php?t=' + sharedfolder + '&dir=/&sort=name&sortdirection=desc').then(function(data) {
                cache = data.data.data.files // :D
                    .filter(function(file) {
                        return file.mimetype.indexOf('audio') > -1 && file.name.split('_').length > 1;
                    })
                    .map(function(file) {
                        var infos = file.name.split('.')[0].split('_');

                        return {
                            filename: file.name,
                            source: {
                                type: file.mimetype.toLowerCase(),
                                src: 'http://' + host + '/index.php/s/' + sharedfolder + '/download?path=/&files=' + file.name
                            },
                            preacher: infos[1]
                                    ? infos[1].replace(/-/g, ' ').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
                                    : undefined,
                            name: infos[2]
                                ? infos[2].replace(/-/g, ' ')
                                : undefined,
                            series: infos[3]
                                  ? infos[3].replace(/-/g, ' ')
                                  : undefined,
                            episode: infos[4]
                                   ? parseInt(infos[4])
                                   : undefined,
                            date: new Date(infos[0])
                        };
                    });

                deferred.resolve(cache);
            }, deferred.reject);
        } else {
            deferred.resolve(cache);
        }

        return deferred.promise;
    }

    return {
        query: init,
        get: function(id) {
            var deferred = $q.defer();

            init().then(function(result) {
                try {
                    deferred.resolve(result[id]);
                } catch (e) {
                    deferred.reject(e);
                }
            });

            return deferred.promise;
        }
    }
}]);
