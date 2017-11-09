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
    once(name, listener, options) {
        const onceListener = (name, params, options) => {
            listener(name, params, options);
            this.off(name, listener);
        };

        if (!this._onceListenersMap) {
            this._onceListenersMap = [];
        }

        this._onceListenersMap.push({
            listener,
            onceListener
        });

        this.on(name, onceListener, options);
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

        const itemIndex = this._listeners[name].findIndex(item => item.listener === listener);
        if (itemIndex === -1) {
            // Looking for listener in once listeners map
            const mapItemIndex = this._onceListenersMap.findIndex(mapItem => mapItem.listener === listener);
            if (mapItemIndex === -1) {
                throw new TypeError(`Specified listener for event "${name}" is not registered.`);
            }

            const {onceListener} = this._onceListenersMap[mapItemIndex];
            this._onceListenersMap.splice(mapItemIndex, 1);
            if (this._onceListenersMap.length === 0) {
                delete this._onceListenersMap;
            }

            this.off(name, onceListener);
            return;
        }

        this._listeners[name].splice(itemIndex, 1);
        if (this._listeners[name].length === 0) {
            delete this._listeners[name];
        }
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
    },
    listenersRegistered(name) {
        return this._listeners && !!this._listeners[name];
    }
};

export default EventMixin;
