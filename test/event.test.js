import chai from 'chai';
chai.should();

import Channel from '../src/Channel';

describe('event', () => {
    it('add event listener and fire event', () => {
        let handled = false;
        const channel = new Channel();
        const listener = () => handled = true;
        channel.on('event', listener);
        channel.fire('event');
        handled.should.be.true;
    });

    it('remove event listener', () => {
        let count = 0;
        const channel = new Channel();
        const listener = () => count++;
        channel.on('event', listener);
        channel.fire('event');
        channel.fire('event');
        channel.off('event', listener);
        channel.fire('event');
        count.should.be.equal(2);
    });

    it('remove not all event listeners', () => {
        const channel = new Channel();
        const listener1 = () => {};
        const listener2 = () => {};
        channel.on('event', listener1);
        channel.on('event', listener2);
        channel.off('event', listener1);
        channel.listenersRegistered('event').should.be.equal(true);
    });

    it('check event listener existance when listener for another event is registered', () => {
        const channel = new Channel();
        const listener = () => {};
        channel.on('anotherEvent', listener);
        channel.listenersRegistered('event').should.be.equal(false);
    });

    it('add few event listeners and fire event', () => {
        let result = '';
        const channel = new Channel();
        const listener1 = () => result += '1';
        const listener2 = () => result += '2';
        const listener3 = () => result += '3';
        channel.on('event', listener1);
        channel.on('event', listener2);
        channel.on('event', listener3);
        channel.fire('event');
        result.should.be.equal('123');
    });

    it('remove all event listeners', () => {
        let result = '';
        const channel = new Channel();
        const listener1 = () => result += '1';
        const listener2 = () => result += '2';
        const listener3 = () => result += '3';
        channel.on('event', listener1);
        channel.on('event', listener2);
        channel.on('event', listener3);
        channel.fire('event');
        channel.off('event');
        channel.on('event', listener1);
        channel.on('event', listener2);
        channel.on('event', listener3);
        result.should.be.equal('123');
    });

    it('remove all listeners of event that has no registered listeners', () => {
        const channel = new Channel();
        channel.off.bind(channel, 'event').should.throw(TypeError);
    });

    it('remove listener of event that has no registered listeners', () => {
        const channel = new Channel();
        const listener = () => {};
        channel.on('event', listener);
        channel.off.bind(channel, 'anotherEvent', listener).should.throw(TypeError);
    });

    it('remove listener of event having registered listeners but not this one', () => {
        const channel = new Channel();
        const listener1 = () => {};
        const listener2 = () => {};
        channel.on('event', listener1);
        channel.off.bind(channel, 'event', listener2).should.throw(TypeError);
    });

    it('fire event without registered listeners', () => {
        let handled = false;
        const channel = new Channel();
        const listener = () => handled = true;
        channel.fire('event');
        handled.should.be.false;
        channel.on('anotherEvent', listener);
        channel.fire('event');
        handled.should.be.false;
    });

    it('interrupt event listeners\' execution chain', () => {
        let result = '';
        const channel = new Channel();
        const listener1 = () => result += '1';
        const listener2 = () => {
            result += '2';
            return false;
        };
        const listener3 = () => result += '3';
        channel.on('event', listener1);
        channel.on('event', listener2);
        channel.on('event', listener3);
        channel.fire('event');
        result.should.be.equal('12');
    });

    it('event name and parameters as event listener arguments', () => {
        const channel = new Channel();
        const eventName = 'event';
        const eventParams = {
            item: 1,
            message: 'hello world'
        };
        const listener = (name, params) => {
            name.should.be.equal(eventName);
            params.should.be.deep.equal(eventParams);
        };
        channel.on(eventName, listener);
        channel.fire(eventName, eventParams);
    });

    it('pass additional options to event listeners', () => {
        const channel = new Channel();
        const eventOptions = {
            item: 1,
            message: 'hello world'
        };
        const listener = (name, params, options) => {
            options.should.be.deep.equal(eventOptions);
        };
        channel.on('event', listener, eventOptions);
        channel.fire('event');
        channel.fire('event', {
            param: 345
        });
    });
});
