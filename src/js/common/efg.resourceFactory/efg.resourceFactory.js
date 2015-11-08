/* global jsyaml */

'use strict';

/**
 * Creates an angular module called
 * `efg.${resource}Api` that offers
 * a service with
 *
 * - `#query()` to retrieve all instances and
 * - `#get(id)` to retrieve a single instance
 *
 * of the resource specified.
 *
 * E.g.
 *
 *     resourceFactory('foo')
 *     // => angular.module('efg.fooApi')
 *     // => FooApi.query()
 *     // => FooApi.get(id)
 *
 * There must be a yml file `/data/${resource}.yml`
 * to succeed.
 *
 * @param {string} resource the resource to serve
 */
function resourceFactory(resource) {
    var api = resource + 'Api';

    angular.module('efg.' + api, ['ng'])

    .factory(api, ['$q', '$http', function ($q, $http) {
        var cache;

        function init() {
            var deferred = $q.defer();

            if (!cache) {
                if (resource == 'sermon') {
                    var sharedfolder = 'Nx83ZHVvnE9GSlk';
                    $http.get('http://cloud.efg-ludwigshafen.de/index.php/apps/files_sharing/ajax/list.php?t=' + sharedfolder + '&dir=/').success(function (data) {
                        cache = [];
                        angular.forEach(data.data.files, function (filedata) {
                            if (filedata.mimetype.indexOf('audio') > -1) {
                                var sermon = {};
                                sermon.filename = filedata.name;
                                var infos = filedata.name.split('.')[0].split('_');
                                sermon.preacher = {};
                                if (infos[1]) {
                                    sermon.preacher.name = infos[1].replace(/-/g,' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                                }
                                sermon.source = {};
                                sermon.source.type = filedata.mimetype.toLowerCase();
                                sermon.source.src = 'http://cloud.efg-ludwigshafen.de/index.php/s/' + sharedfolder + '/download?path=%2F&files=' + sermon.filename;
                                if (infos[2]) {
                                    sermon.name = infos[2].replace(/-/g,' ');
                                }
                                sermon.date = Date.parse(infos[0]);
                                cache.push(sermon);
                            }
                        });
                        console.log(cache);
                        deferred.resolve(cache);
                    });
                } else {
                    $http.get('data/' + resource + '.yml').success(function (yml) {
                        cache = jsyaml.load(yml);
                        deferred.resolve(cache);
                    });
                }
            } else {
                deferred.resolve(cache);
            }

            return deferred.promise;
        }

        return {
            query: init,
            get: function (id) {
                var deferred = $q.defer();

                init().then(function success(result) {
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

resourceFactory('group');
resourceFactory('service');
resourceFactory('member');
resourceFactory('next');
resourceFactory('contact');
resourceFactory('info');
resourceFactory('sermon');