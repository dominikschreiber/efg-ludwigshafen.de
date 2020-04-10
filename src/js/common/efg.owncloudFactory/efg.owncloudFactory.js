'use strict';

/**
 * @param {String} resource name for the generated service
 * @param {(object => String) => ((Array, String) => Array)} reducer method
 * that gets a srcbuilder (object => String) to create a full url for a given
 * filename and returns a method that will be used to reduce the files served
 * by owncloud (see example)
 * @param {{String: String}} options? additional options for the folder listing
 * request (e.g. {{{sort: 'name'}}})
 */
function owncloudFactory(resource, reducer, options) {
  var api = resource + 'Api';

  angular.module('efg.' + api, ['efg.configurationApi', 'ng']).factory(api, [
    '$q',
    '$http',
    'configurationApi',
    function($q, $http, configurationApi) {
      var cache;

      function init() {
        var deferred = $q.defer();

        if (cache) {
          deferred.resolve(cache);
        } else {
          configurationApi.get('owncloud').then(
            function(conf) {
              var host = conf.host, sharedfolderid = conf.folders[resource];

              $http
                .get(
                  'https://' +
                    host +
                    '/index.php/apps/files_sharing/ajax/list.php?t=' +
                    sharedfolderid +
                    '&dir=/' +
                    (options && Object.keys(options).length > 0
                      ? '&' +
                          Object.keys(options).reduce(
                            function(all, now) {
                              return all + '&' + now + '=' + options[now];
                            },
                            []
                          )
                      : '')
                )
                .then(
                  function(data) {
                    cache = data.data.data.files.reduce(
                      reducer(function(filename) {
                        return 'https://' +
                          host +
                          '/index.php/s/' +
                          sharedfolderid +
                          '/download?path=/&files=' +
                          filename;
                      }),
                      []
                    );
                    deferred.resolve(cache);
                  },
                  deferred.reject
                );
            },
            deferred.reject
          );
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
    }
  ]);
}

owncloudFactory('downloads', function(srcbuilder) {
  return function(items, file) {
    return items.concat([
      {
        filename: file.name,
        title: file.name.split('.').slice(0, -1).join('.'),
        ending: file.name.split('.').slice(-1)[0],
        url: srcbuilder(file.name)
      }
    ]);
  };
});
