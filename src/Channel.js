import EventMixin from './mixins/EventMixin';
import CommandMixin from './mixins/CommandMixin';

class Channel {}
Object.assign(Channel.prototype, EventMixin, CommandMixin);

export default Channel;
