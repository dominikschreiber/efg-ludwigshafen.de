'use strict';

/**
 * @param {string} resource name for the generated service
 * @param {string} sharedfolderid the ID of the folder shared by owncloud
 * @param {(object => string) => ((Array, string) => Array)} reducer method
 * that gets a srcbuilder (object => string) to create a full url for a given
 * filename and returns a method that will be used to reduce the files served
 * by owncloud (see example)
 * @param {{string: string}} options additional options for the folder listing
 * request (e.g. {{{sort: 'name'}}})  
 */
function owncloudFactory(resource, sharedfolderid, reducer, options) {
    var api = resource + 'Api';
    
    angular.module('efg.' + api, ['ng'])
    .factory(api, ['$q', '$http', function($q, $http) {
        var cache
        , host = 'cloud.efg-ludwigshafen.de';
        
        function init() {
            var deferred = $q.defer();
            
            if (cache) {
                deferred.resolve(cache);
            } else {
                $http.get('http://' + host + '/index.php/apps/files_sharing/ajax/list.php?t=' + sharedfolderid + '&dir=/'+ (options && Object.keys(options).length > 0 ? '&' + Object.keys(options).reduce(function(all, now) { return all + '&' + now + '=' + options[now]; }, []) : '')).then(function(data) {
                    cache = data.data.data.files.reduce(reducer(function(filename) {
                        return 'http://' + host + '/index.php/s/' + sharedfolderid + '/download?path=/&files=' + filename;
                    }), []);
                    deferred.resolve(cache);
                }, deferred.reject);
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
        };
    }]);
}

owncloudFactory('sermon', 'bq1QQFmNVLVoE8p', function(srcbuilder) {
    return function(sermons, file) {
        var infos;
        if (file.mimetype.indexOf('audio') > -1 && file.name.split('_').length > 1) {
            infos = file.name.split('.')[0].split('_');
            
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
            return sermons.concat([{
                filename: file.name,
                source: {
                    type: file.mimetype.toLowerCase(),
                    src: srcbuilder(file.name)
                },
                preacher: infos[1]
                        ? infos[1].replace(/-/g, ' ').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })
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
            }]);
        } else {
            return sermons;
        }
    };
}, {sort: 'name', sortdirection: 'dec'});
owncloudFactory('press', '9VJFv5jmb3JpNXB', function(srcbuilder) {
    return function(items, file) {
        return items.concat([{
            filename: file.name,
            title: file.name.split('.').slice(0, -1).join('.'),
            ending: file.name.split('.').slice(-1)[0],
            url: srcbuilder(file.name)
        }]);
    };
});