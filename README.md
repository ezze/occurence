# dissemination

[![NPM Version](https://badge.fury.io/js/dissemination.svg)](https://badge.fury.io/js/dissemination)
[![Build Status](https://travis-ci.org/ezze/dissemination.svg?branch=dev)](https://travis-ci.org/ezze/dissemination)
[![Coverage Status](https://coveralls.io/repos/github/ezze/dissemination/badge.svg)](https://coveralls.io/github/ezze/dissemination)

Lightweight event/command library created to replace [Backbone.Radio](https://github.com/marionettejs/backbone.radio) in
projects ported from [Backbone](http://backbonejs.org/)/[Marionette](https://marionettejs.com/) to [React](https://facebook.github.io/react/).

## Installation

```bash
npm install dissemination --save
```
    
## Usage

- require with Node.js:

    ```javascript
    var channel = require('dissemination');
    ```

- in browser include `dist/dissemination.js` or `dist/dissemination.min.js` script:

    ```javascript
    var channel = window.dissemination;
    ```
    
and then    
    
```javascript    
channel().on('event', function() { console.log('event is fired'); });
channel().fire('event');
```

## Examples

### Channel

- get default channel (with `application` name):

    ```javascript
    var c = channel();
    ```
    
- get named channel:

    ```javascript
    var c = channel('myChannel');
    ```
    
### Events
    
- add event listener:

    ```javascript
    var listener = function() { console.log('event is fired'); };
    channel().on('event', listener);
    ```    
    
- remove specific event listener:
    
    ```javascript
    channel().off('event', listener);
    ```
    
- remove all event listeners for a given event:
    
    ```javascript
    channel().off('event');
    ```
    
- fire event:

    ```javascript
    channel().fire('event');
    ```
    
- fire event with parameters:
    
    ```javascript
    var listener = function(name, params) {
        console.log(name); // => 'event'
        console.log(params); // => { item: 1 }
    };
    channel().on('event', listener);
    channel().fire('event', { item: 1 });
    ```
    
- add event listener with additional options:
    
    ```javascript
    var listener = function(name, params, options) {
        console.log(name); // => 'event'
        console.log(params); // => { item: 1 }
        console.log(options); // => { message: 'hello world' }
    };
    channel().on('event', listener, {
        message: 'hello world'      
    });
    channel().fire('event', { item: 1 });    
    ```
    
- interrupt event listeners' execution chain:
    
    ```javascript
    var result = 0;
    var listener1 = function() { result += 1; return false; }
    var listener2 = function() { result += 2; }
    channel().on('event', listener1);
    channel().on('event', listener2);
    channel().fire('event');
    console.log(result); // => 1
    ```
    
### Commands
    
- add command handler:

    ```javascript
    var handler = function() { console.log('command is handled'); };
    channel().handle('command', handler);
    ```
    
- remove specific command handler:
    
    ```javascript
    channel().unhandle('command');
    ```
    
- execute command:

    ```javascript
    channel().execute('command');
    ```
    
- execute command with response result:
    
    ```javascript
    var handler = function() { return 1 };
    channel().handle('command', handler);
    console.log(channel().request('command')); // => 1
    ```
    
- add command handler with additional options:    
    
    ```javascript
    var positive = function(options) {
        return options.number >= 0;
    };
    channel().handle('positive', positive);
    console.log(channel().request('positive', { number: 2 })); // => true
    console.log(channel().request('positive', { number: -1 })); // => false
    ```
    
### Mixins

- add `EventMixin` or/and `CommandMixin` to any custom object:

    ```javascript
    var events = Object.assign({}, channel.EventMixin);
    events.on('event', function({ console.log('event is fired'); }));
    events.fire('event');
    ```
    
    ```javascript
    var commands = Object.assign({}, channel.CommandMixin);
    commands.handle('command', function({ return 'hello world'; }));
    console.log(commands.request('command')); // => 'hello world'
    ```

## Building

In order to build library run:
                                          
    npm run build
    
## Testing
    
Run unit tests:
    
    npm test
    
In order to run tests with [Coveralls](http://coveralls.io) locally you have to provide `COVERALLS_REPO_TOKEN`:
        
    COVERALLS_REPO_TOKEN=<token> npm run test:coverage
    
## Contribution
    
Before making a pull request, please, be sure that your changes are rebased to `dev` branch.

## License

[MIT](LICENSE)
