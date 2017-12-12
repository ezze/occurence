# dissemination

[![NPM Version](https://badge.fury.io/js/dissemination.svg)](https://badge.fury.io/js/dissemination)
[![Build Status](https://travis-ci.org/ezze/dissemination.svg?branch=develop)](https://travis-ci.org/ezze/dissemination)
[![Coverage Status](https://coveralls.io/repos/github/ezze/dissemination/badge.svg?branch=develop)](https://coveralls.io/github/ezze/dissemination?branch=develop)
[![Downloads/month](https://img.shields.io/npm/dm/dissemination.svg?maxAge=86400)](https://www.npmjs.com/package/dissemination)
[![Greenkeeper badge](https://badges.greenkeeper.io/ezze/dissemination.svg)](https://greenkeeper.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Lightweight event/command library created to replace [Backbone.Radio](https://github.com/marionettejs/backbone.radio) in
projects ported from [Backbone](http://backbonejs.org/)/[Marionette](https://marionettejs.com/) to [React](https://facebook.github.io/react/).

## Installation

```bash
npm install dissemination --save
```
    
## Usage

- require with Node.js:

    ```javascript
    var dissemination = require('dissemination');
    ```

- in browser include `dist/index.js` or `dist/dissemination.min.js` script:

    ```javascript
    var dissemination = window.dissemination;
    ```
    
and then    
    
```javascript    
dissemination().on('event', function() { console.log('event is fired'); });
dissemination().fire('event');
```

## Examples

### Channel

- get default dissemination (with `application` name):

    ```javascript
    var c = dissemination();
    ```
    
- get named dissemination:

    ```javascript
    var c = dissemination('myChannel');
    ```
    
### Events
    
- add event listener:

    ```javascript
    var listener = function() { console.log('event is fired'); };
    dissemination().on('event', listener);
    ```    
    
- remove specific event listener:
    
    ```javascript
    dissemination().off('event', listener);
    ```
    
- remove all event listeners for a given event:
    
    ```javascript
    dissemination().off('event');
    ```
    
- fire event:

    ```javascript
    dissemination().fire('event');
    ```
    
- fire event with parameters:
    
    ```javascript
    var listener = function(name, params) {
        console.log(name); // => 'event'
        console.log(params); // => { item: 1 }
    };
    dissemination().on('event', listener);
    dissemination().fire('event', { item: 1 });
    ```
    
- add event listener with additional options:
    
    ```javascript
    var listener = function(name, params, options) {
        console.log(name); // => 'event'
        console.log(params); // => { item: 1 }
        console.log(options); // => { message: 'hello world' }
    };
    dissemination().on('event', listener, {
        message: 'hello world'      
    });
    dissemination().fire('event', { item: 1 });    
    ```
    
- add event listener that will be executed once:

    ```javascript
    var count = 0;
    var listener = function() { count += 1; };
    dissemination().once('event', listener);
    dissemination().fire('event');
    dissemination().fire('event');
    console.log(count); // => 1
    ```
    
- interrupt event listeners' execution chain:
    
    ```javascript
    var result = 0;
    var listener1 = function() { result += 1; return false; };
    var listener2 = function() { result += 2; };
    dissemination().on('event', listener1);
    dissemination().on('event', listener2);
    dissemination().fire('event');
    console.log(result); // => 1
    ```
    
- check whether event listeners are registered:

    ```javascript
    var listener = function() { console.log('event is fired'); };
    dissemination().on('event', listener);
    console.log(dissemination().listenersRegistered('event')); // => true
    ```
    
### Commands
    
- add command handler:

    ```javascript
    var handler = function() { console.log('command is handled'); };
    dissemination().handle('command', handler);
    ```
    
- remove specific command handler:
    
    ```javascript
    dissemination().unhandle('command');
    ```
    
- execute command:

    ```javascript
    dissemination().execute('command');
    ```
    
- execute command with response result:
    
    ```javascript
    var handler = function() { return 1 };
    dissemination().handle('command', handler);
    console.log(dissemination().request('command')); // => 1
    ```
    
- add command handler with additional options:    
    
    ```javascript
    var positive = function(options) {
        return options.number >= 0;
    };
    dissemination().handle('positive', positive);
    console.log(dissemination().request('positive', { number: 2 })); // => true
    console.log(dissemination().request('positive', { number: -1 })); // => false
    ```
    
- check whether command handler is registered:

    ```javascript
    var handler = function() { console.log('command is handled'); };
    dissemination().handle('command', handler);
    console.log(dissemination().handlerRegistered('command')); // => true
    ```    
    
### Mixins

- add `EventMixin` or/and `CommandMixin` to any custom object:

    ```javascript
    var events = Object.assign({}, dissemination.EventMixin);
    events.on('event', function() { console.log('event is fired'); });
    events.fire('event');
    ```
    
    ```javascript
    var commands = Object.assign({}, dissemination.CommandMixin);
    commands.handle('command', function() { return 'hello world'; });
    console.log(commands.request('command')); // => 'hello world'
    ```

## Building

In order to build library run:
                                          
    npm run build
    
## Testing
    
Run unit tests:
    
    npm test
    
Run tests with coverage:

    npm run test:coverage
    
In order to run tests with [Coveralls](http://coveralls.io) locally you have to provide `COVERALLS_REPO_TOKEN`:
        
    COVERALLS_REPO_TOKEN=<token> npm run test:coverage
    
## Contributing
    
Before making a pull request, please, be sure that you are starting from `develop` branch.

## License

[MIT](LICENSE)
