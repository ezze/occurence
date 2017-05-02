import chai from 'chai';
chai.should();

import Channel from '../src/Channel';

describe('Channel', () => {
    it('add event listener and fire event', () => {
        let handled = false;
        const channel = new Channel();
        channel.on('event', () => handled = true);
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
});
