const { app, BrowserWindow } = require('electron')
const path = require('path')
const Api = require('./api')

const production = app.isPackaged 

function timestamp() {
    const pad = (str) => {
        const prefix = `${str}`.length === 1 ? '0' : ''
        
        return `${prefix}${str}`
    }
    const date = new Date
    return '[' +
        `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` + 
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
        ']'
}

function startWatcher(mainWindow) {
    const colors = require('colors')
    const chokidar = require('chokidar')
    
    const watcherBe = chokidar.watch(__dirname, { ignoreInitial: true })
    watcherBe.on('ready', () => console.log('Backend watcher'.green, 'enabled'.bold.green))
    watcherBe.on('error', (err) => console.log('Backend watcher error:'.red, `${err}`.bold.red))
    watcherBe.on('change', () => {
        console.log(timestamp(), 'restarting app')
        app.exit()
    })

    const watcherFe = chokidar.watch(path.join(__dirname, '../public'), { ignoreInitial: true })
    watcherFe.on('ready', () => console.log('Frontend watcher'.green, 'enabled'.bold.green))
    watcherBe.on('error', (err) => console.log('Frontend watcher error:'.red, `${err}`.bold.red))
    watcherFe.on('change', () => {
        console.log(timestamp(), 'reloading page')
        mainWindow.reload()
    })
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            devTools: !production,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile(path.join(__dirname, '../public/index.html'))

    if (!production) {
        mainWindow.webContents.reloadIgnoringCache()
        mainWindow.webContents.openDevTools()
        startWatcher(mainWindow)
    }

    Api.init()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
