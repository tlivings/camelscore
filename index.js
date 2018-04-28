'use strict';

var thing = require('core-util-is');

exports = module.exports = {

    /**
     * Camel cases all properties in an object.
     * @param obj
     * @param mapFn map keys, return undefined to not include.
     */
    camelize: function camelize(obj, mapFn) {
        var newobj, keys, k;

        if (!mapFn) {
            mapFn = function (k) {
                return k;
            };
        }

        if (thing.isArray(obj)) {
            newobj = [];

            for (var i = 0; i < obj.length; i++) {
                if (obj[i] && thing.isObject(obj[i])) {
                    newobj[i] = exports.camelize(obj[i], mapFn);
                }
                else {
                    newobj[i] = obj[i];
                }
            }
        }
        else if (thing.isObject(obj) && !Buffer.isBuffer(obj)) {
            newobj = {};
            keys = Object.keys(obj);

            for (var i = 0; i < keys.length; i++) {
                k = mapFn(keys[i]);
                if (!k) {
                    continue;
                }
                k = exports.camelCase(k);
                newobj[k] = exports.camelize(obj[keys[i]], mapFn);
            }
        }
        else {
            newobj = obj;
        }

        return newobj;
    },

    /**
     * Converts camel case propert names to underscored.
     * @param obj
     * @param mapFn map keys, return undefined to not include.
     */
    underscorify: function (obj, mapFn) {
        var newobj, keys, k;

        if (!mapFn) {
            mapFn = function (k) {
                return k;
            };
        }

        if (thing.isArray(obj)) {
            newobj = [];

            for (var i = 0; i < obj.length; i++) {
                if (thing.isObject(obj[i])) {
                    newobj[i] = exports.underscorify(obj[i], mapFn);
                }
                else {
                    newobj[i] = obj[i];
                }
            }
        }
        else if (thing.isObject(obj) && !Buffer.isBuffer(obj)) {
            newobj = {};
            keys = Object.keys(obj);

            for (var i = 0; i < keys.length; i++) {
                k = mapFn(keys[i]);
                if (!k) {
                    continue;
                }
                k = exports.underscore(k);
                newobj[k] = exports.underscorify(obj[keys[i]], mapFn);
            }
        }
        else {
            newobj = obj;
        }

        return newobj;
    },

    /**
     * Convert foo_bar to fooBar.
     * @param gapped
     * @returns {string|*}
     */
    camelCase: function camelCase(str) {
        return str.replace(/([aA-zZ])_(\w)/g, function (g) {
            return g[0] + g[2].toUpperCase();
        });
    },

    /**
     * Convert fooBar to foo_bar.
     * @param humped
     * @returns {string|*}
     */
    underscore: function underscore(str) {
        return str.replace(/([a-z])([A-Z0-9]+)/g, function (g) {
            return g.split('').map(function (k) {
                return k.toLowerCase();
            }).join('_');
        });
    }
};
