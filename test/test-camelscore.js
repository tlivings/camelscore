'use strict';

var test = require('tape'),
    camelscore = require('../index');

test('test', function (t) {

    t.test('camelCase', function (assert) {
        var str = camelscore.camelCase('foo_bar');

        assert.plan(5);

        assert.strictEqual(str, 'fooBar', 'camel cased 1 underscore.');

        str = camelscore.camelCase('foo_bar_baz');

        assert.strictEqual(str, 'fooBarBaz', 'camel cased 2 underscores.');

        str = camelscore.camelCase('is_2FA_login');

        assert.strictEqual(str, 'is2FALogin', 'camel cased 2 underscores with a caps.');

        str = camelscore.camelCase('_foo_bar_baz');

        assert.strictEqual(str, '_fooBarBaz', 'camel cased and left leading _.');

        str = camelscore.camelCase('foo_bar_baz_');

        assert.strictEqual(str, 'fooBarBaz_', 'camel cased and left trailing _.');
    });

    t.test('underscore', function (assert) {
        var str = camelscore.underscore('fooBar');

        assert.plan(5);

        assert.strictEqual(str, 'foo_bar', 'underscore cased with 1 hump.');

        str = camelscore.underscore('fooBarBaz');

        assert.strictEqual(str, 'foo_bar_baz', 'underscore cased with 2 humps.');

        str = camelscore.underscore('is2FALogin');

        //This sucks but is reality
        assert.strictEqual(str, 'is_2_f_a_login', 'underscore cased with 2 humps and caps.');

        str = camelscore.underscore('_fooBaredBaz');

        assert.strictEqual(str, '_foo_bared_baz', 'underscore cased and left leading _.');

        str = camelscore.underscore('fooBaredBaz_');

        assert.strictEqual(str, 'foo_bared_baz_', 'underscore cased and left trailing _.');
    });

    t.test('underscorify', function (assert) {
        var obj = camelscore.underscorify({
            fooBar: {
                barBaz: {
                    fizzButt: 'fizzy'
                }
            },
            quxQax: [
                {
                    fooQux: 'bar'
                },
                {
                    bar: 'baz'
                },
                'fooBar'
            ]
        });

        assert.plan(8);

        assert.ok(obj, 'underscorify returned something.');
        assert.strictEqual(typeof obj, 'object', 'underscorify returned an object.');
        assert.ok(obj.hasOwnProperty('foo_bar'), 'has foo_bar.');
        assert.ok(obj.foo_bar.hasOwnProperty('bar_baz'), 'has bar_baz.');
        assert.ok(obj.hasOwnProperty('qux_qax'), 'has qux_qax.');
        assert.ok(obj.qux_qax[0].hasOwnProperty('foo_qux'), 'has foo_qux.');
        assert.ok(obj.qux_qax[1].hasOwnProperty('bar'), 'has bar.');
        assert.strictEqual(obj.qux_qax[2], 'fooBar', 'did not underscorify non object in array.');
    });

    t.test('camelize', function (assert) {
        var obj = camelscore.camelize({
            foo_bar: {
                bar_baz: {
                    fizz_butt: 'fizzy'
                }
            },
            qux_qax: [
                {
                    foo_qux: 'bar'
                },
                {
                    bar: 'baz'
                },
                'foo_bar'
            ]
        });

        assert.plan(8);

        assert.ok(obj, 'camelize return something.');
        assert.strictEqual(typeof obj, 'object', 'camelize returned an object.');
        assert.ok(obj.hasOwnProperty('fooBar'), 'has fooBar.');
        assert.ok(obj.fooBar.hasOwnProperty('barBaz'), 'has barBaz.');
        assert.ok(obj.hasOwnProperty('quxQax'), 'has quxQax.');
        assert.ok(obj.quxQax[0].hasOwnProperty('fooQux'), 'has fooQux.');
        assert.ok(obj.quxQax[1].hasOwnProperty('bar'), 'has bar.');
        assert.strictEqual(obj.quxQax[2], 'foo_bar', 'did not camelize non object in array.');
    });

    t.test('camelize with map function.', function (assert) {
        var obj = camelscore.camelize({
            foo_bar: {
                bad: 'bar',
                bar_baz: {
                    bad: 'baz'
                }
            }
        }, function (key) {
            return key === 'bad' ? undefined : key;
        });

        assert.plan(2);

        assert.ok(!obj.fooBar.hasOwnProperty('bad'), 'filtered out.');
        assert.ok(!obj.fooBar.barBaz.hasOwnProperty('bad'), 'filtered out.');
    });

    t.test('underscorify with map function.', function (assert) {
        var obj = camelscore.underscorify({
            fooBar: {
                bad: 'bar',
                barBaz: {
                    bad: 'baz'
                }
            }
        }, function (key) {
            return key === 'bad' ? undefined : key;
        });

        assert.plan(2);

        assert.ok(!obj.foo_bar.hasOwnProperty('bad'), 'filtere out.');
        assert.ok(!obj.foo_bar.bar_baz.hasOwnProperty('bad'), 'filtered out.');
    });

    t.test('camelize skips buffers', function (assert) {
        assert.plan(1);

        assert.ok(Buffer.isBuffer(camelscore.camelize(new Buffer(10))), 'came back a buffer.');
    });

    t.test('underscorify skips buffers', function (assert) {
        assert.plan(1);

        assert.ok(Buffer.isBuffer(camelscore.underscorify(new Buffer(10))), 'came back a buffer.');
    });

});
