import Channel from './Channel';

const channels = {};
const channel = name => {
    name = name || 'application';
    if (!channels[name]) {
        channels[name] = new Channel();
    }
    return channels[name];
};

export default channel;
