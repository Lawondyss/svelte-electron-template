const { contextBridge, ipcRenderer } = require('electron')
const Api = require('./api')

contextBridge.exposeInMainWorld('api', (channel, data) => {
    if (!Api.whitelist.includes(channel)) {
        throw new Error(`Channel "${channel}" is not allowed`)
    }

    return new Promise((resolve) => {
        resolve(ipcRenderer.sendSync(channel, data))
    })
})
