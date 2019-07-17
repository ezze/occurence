const EventMixin = {
  on(name, listener, options = {}, once = false) {
    if (!this._listeners) {
      this._listeners = {};
    }
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }
    this._listeners[name].push({ listener, options, once: !!once });
  },
  once(name, listener, options) {
    this.on(name, listener, options, true);
  },
  off(name, listener) {
    if (!this.listenersRegistered(name)) {
      throw new TypeError(`Listeners for event "${name}" are not registered.`);
    }
    if (listener === undefined) {
      // Removing all listeners for a given event
      delete this._listeners[name];
      return;
    }
    const index = this._listeners[name].findIndex(item => item.listener === listener);
    if (index === -1) {
      throw new TypeError(`Specified listener for event "${name}" is not registered.`);
    }

    this._listeners[name].splice(index, 1);
    if (this._listeners[name].length === 0) {
      delete this._listeners[name];
    }
  },
  fire(name, params = {}) {
    if (!this._listeners || !this._listeners[name]) {
      return;
    }
    const listeners = this._listeners[name];
    for (let i = 0; i < listeners.length; i++) {
      const item = listeners[i];
      const { listener, options, once = false } = item;
      if (once) {
        listeners.splice(i, 1);
        i--;
      }
      if (listener(params, options) === false) {
        break;
      }
    }
  },
  listenersRegistered(name) {
    return this._listeners && !!this._listeners[name];
  }
};

export default EventMixin;
