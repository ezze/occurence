import Channel from './Channel';
import EventMixin from './mixins/EventMixin';
import CommandMixin from './mixins/CommandMixin';

import getChannel from './getChannel';

getChannel.Channel = Channel;
getChannel.EventMixin = EventMixin;
getChannel.CommandMixin = CommandMixin;

export default getChannel;
