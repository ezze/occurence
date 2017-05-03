import assign from 'object-assign';

import EventMixin from './mixins/EventMixin';
import CommandMixin from './mixins/CommandMixin';

class Channel {}
assign(Channel.prototype, EventMixin, CommandMixin);

export default Channel;
