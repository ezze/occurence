import chai from 'chai';
chai.should();

import Channel from '../src/Channel';

describe('command', () => {
    it('add command handler and execute it', () => {
        let handled = false;
        const channel = new Channel();
        const handler = () => handled = true;
        channel.handle('command', handler);
        channel.execute('command');
        handled.should.be.true;
    });

    it('remove command handler', () => {
        let count = 0;
        const channel = new Channel();
        const handler = () => count++;
        channel.handle('command', handler);
        channel.execute('command');
        channel.execute('command');
        channel.unhandle('command');
        channel.execute.bind(channel, 'command').should.throw(TypeError);
        count.should.be.equal(2);
    });

    it('remove not registered command handler when no any handlers are registered', () => {
        const channel = new Channel();
        channel.unhandle.bind(channel, 'command').should.throw(TypeError);
    });

    it('remove not registered command handler when handlers for another commands are registered', () => {
        const channel = new Channel();
        const handler = () => {};
        channel.handle('command', handler);
        channel.unhandle.bind(channel, 'anotherCommand').should.throw(TypeError);
    });

    it('don\'t return result for command execution', () => {
        const channel = new Channel();
        const handler = () => 1;
        channel.handle('command', handler);
        (channel.execute('command') === undefined).should.be.true;
    });

    it('return result for command request', () => {
        const channel = new Channel();
        const handler = () => 1;
        channel.handle('command', handler);
        channel.request('command').should.be.equal(1);
    });
});
