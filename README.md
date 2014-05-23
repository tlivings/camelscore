# Camelscore

Utility functions for converting `under_score` style strings to `camelCase` and the reverse, as well as on objects.

Also works on objects for converting all property names, as well as stripping or modifying keys before running.

# API

- `camelCase(string)` - convert a underscored string to camel-case. Note: leading and trailing `_` will not be affected.
- `underscore(string)` - convert a camel-cased string to underscores. Note: leading and trailing `_` will not be affected.
- `camelize(object, fn)` - convert an object's underscored property names to camel-case. Optionally run `fn` through `map` function first.
- `underscorify(object, fn)` - convert an object's camel-cased property names to underscores. Optionally run `fn` through `map` function first.

# Usage

```javascript
var camelscore = require('camelscore');

var camelCased = camelscore.camelize({
    foo_bar: {
        hello_world: "hello world!"
    }
});
```

Will result in:

```javascript
{
    "fooBar": {
        "helloWorld": "hello world!"
    }
}
```

To use `map` function:

```javascript
var camelscore = require('camelscore');

var camelCased = camelscore.camelize({
    foo_bar: {
        hello_world: "hello world!",
        goodbye: "goodbye"
    }
}, function (k) {
    return k === 'goobye' ? undefined : k;
});
```

Will result in:

```javascript
{
    "fooBar": {
        "helloWorld": "hello world!"
    }
}
```
