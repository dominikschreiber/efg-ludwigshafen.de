angular.module('efg.headerbarService', [
    'ng'
])

.factory('headerbar', function() {
    var title = ''
        /** @type {Array<T>} */
      , items = [];

    return {
        /**
         * @param {string} t? title to set
         * @return {string|headerbar} if called without arguments
         * returns the current title, otherwise returns the
         * headerbar (with the updated title), for chained calls
         */
        title: function(t) {
            if (t) {
                title = t;
                return this;
            } else {
                return title;
            }
        },

        /**
         * @return {headerbar} the headerbar, for chained calls
         */
        clear: function() {
            items = [];
            return this;
        },

        /**
         * @param {T...} item... possibly multiple items
         * to be added to the headerbar
         * @return {headerbar} the headerbar, for chained calls
         */
        add: function() {
            for (var i = 0; i < arguments.length; i++) {
                if (items.indexOf(arguments[i]) === -1) {
                    items.push(arguments[i]);
                }
            }
            return this;
        },

        /**
         * @param {T...} item... possibly multiple items
         * to be removed from the headerbar
         * @return {headerbar} the headerbar, for chained calls
         */
        remove: function() {
            var i
              , index;

            for (i = 0; i < arguments.length; i++) {
                index = items.indexOf(arguments[i]);
                if (index > -1) {
                    items.splice(index, 1);
                }
            }
            return this;
        },

        update: function() {
            var i
              , index;

            for (i = 0; i < arguments.length; i++) {
                index = items.map(function(item) { return item.id; }).indexOf(arguments[i].id);
                if (index > -1) {
                    items[index] = arguments[i];
                }
            }
            return this;
        },

        /**
         * @return {Array<T>} all items of the headerbar
         */
        query: function() {
            return items;
        },

        /**
         * retrieves the first item in {{items}} that matches
         * {{id}} in {{idparam}}
         * @param {any} id the id to find
         * @param {string} idparam? parameter to be used as
         * id (defaults to {{'id'}})
         * @return {T|undefined} the item that matches, or
         * undefined (if none matches)
         */
        get: function(id, idparam) {
            if (!idparam) {
                idparam = 'id';
            }
            return items.reduce(function(result, now) {
                if (result !== undefined) {
                    return result;
                }
                return (now[idparam] && now[idparam] === id)
                    ? now
                    : undefined;
            }, undefined);
        }
    };
});