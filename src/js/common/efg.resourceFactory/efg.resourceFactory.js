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

    .factory(api, ['$q', '$http', function($q, $http) {
        var cache;

        function init() {
            var deferred = $q.defer();

            if (!cache) {
                if (resource == "sermon") {
                    $http.get('http://cloud.efg-ludwigshafen.de/index.php/apps/files_sharing/ajax/list.php?t=Nx83ZHVvnE9GSlk&dir=/').success(function (data) {
                        cache = data.data.files;
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
            get: function(id) {
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
        }
    }]);
}

resourceFactory('group');
resourceFactory('service');
resourceFactory('member');
resourceFactory('next');
resourceFactory('contact');
resourceFactory('info');
resourceFactory('sermon');