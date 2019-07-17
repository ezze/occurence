## Changelog

- Don't pass event name as an argument to listeners.

### 0.4.0 (2017-12-12)

- [Rollup](https://rollupjs.org/) is used to build the library for multiple targets.
- `Channel`, `EventMixin`, `CommandMixin`, `getChannel` can be imported separately.

### 0.3.0 (2017-11-10)

- `once` method is added to `EventMixin`.
- New tests for `once` method are adde.

### 0.2.2 (2017-11-01)

- `listenersRegistered` and `handlerRegistered` methods are improved (exception of `listenersRegistered`
is fixed when some another event listener is registered);
- New tests for `listenersRegistered` and `handlerRegistered` methods are added.

### 0.2.1 (2017-09-12)

- `listenersRegistered` and `handlerRegistered` methods are added to `EventMixen` and `CommandMixin`
respectively.

### 0.2.0 (2017-05-03)

- The following [Webpack](https://webpack.js.org/) warning is fixed:

        WARNING in ./~/dissemination/lib/Channel.js
        There are multiple modules with names that only differ in casing.
        This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
        Use equal casing.

### 0.1.0 (2017-05-03)

- First version.
