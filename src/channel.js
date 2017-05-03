import Channel from './Channel';
import EventMixin from './mixins/EventMixin';
import CommandMixin from './mixins/CommandMixin';

const channels = {};
const channel = name => {
    name = name || 'application';
    if (!channels[name]) {
        channels[name] = new Channel();
    }
    return channels[name];
};

channel.EventMixin = EventMixin;
channel.CommandMixin = CommandMixin;
export default channel;
