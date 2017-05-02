const EventMixin = {
    on(name, listener, options) {
        options = options || {};

        if (!this._listeners) {
            this._listeners = {};
        }

        if (!this._listeners[name]) {
            this._listeners[name] = [];
        }

        this._listeners[name].push({
            listener,
            options
        });
    },
    off(name, listener) {
        if (!this._listeners || !this._listeners[name]) {
            throw new TypeError(`Listeners for event "${name}" are not registered.`);
        }

        if (listener === undefined) {
            // Removing all listeners for a given event
            delete this._listeners[name];
            return;
        }

        const index = this._listeners[name].findIndex(item => {
            return item.listener === listener;
        });

        if (index === -1) {
            throw new TypeError(`Specified listener for event "${name}" is not registered.`);
        }

        this._listeners[name].splice(index, 1);
    },
    fire(name, params) {
        if (!this._listeners || !this._listeners[name]) {
            return;
        }

        params = params || {};

        const listeners = this._listeners[name];
        for (let i = 0; i < listeners.length; i++) {
            const item = listeners[i];
            const {listener, options} = item;
            if (listener(name, params, options) === false) {
                break;
            }
        }
    }
};

export default EventMixin;
