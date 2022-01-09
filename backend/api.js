const { ipcMain } = require('electron')
const Handlers = require('./handlers')

class Api {

    get whitelist() {
        return this.#listHandlers()
    }

    init() {
        this.#listHandlers().forEach((name) => {
            ipcMain.on(name, (evt, ...args) => {
                evt.returnValue = Handlers[name](...args)
            })
        })
    }

    #listHandlers() {
        return Object.getOwnPropertyNames(Object.getPrototypeOf(Handlers))
            .filter((name) => name !== 'constructor' && typeof Handlers[name] === 'function')
    }

}

module.exports = new Api