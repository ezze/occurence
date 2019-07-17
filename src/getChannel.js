import Channel from './Channel';

const channels = {};

export default function getChannel(name) {
  name = name || 'application';
  if (!channels[name]) {
    channels[name] = new Channel();
  }
  return channels[name];
}
