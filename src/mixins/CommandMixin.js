const CommandMixin = {
    handle(name, handler) {
        if (!this._handlers) {
            this._handlers = {};
        }

        if (this._handlers[name]) {
            throw new TypeError(`Another handler for command "${name}" is already registered.`);
        }

        this._handlers[name] = handler;
    },
    unhandle(name) {
        if (!this.handlerRegistered(name)) {
            throw new TypeError(`Handler for command "${name}" is not registered.`);
        }

        delete this._handlers[name];
    },
    request(name, options) {
        if (!this.handlerRegistered(name)) {
            throw new TypeError(`Handler for command "${name}" is not registered.`);
        }

        return this._handlers[name](options || {});
    },
    execute(name, options) {
        this.request(name, options);
    },
    handlerRegistered(name) {
        return this._handlers && !!this._handlers[name];
    }
};

export default CommandMixin;
