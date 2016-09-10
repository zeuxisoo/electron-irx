'use strict'

const path = require('path')
const { app, protocol, BrowserWindow } = require('electron')

let mainWindow = null

const openMainWindow = () => {
    protocol.registerFileProtocol(
        'atom',
        (request, callback) => {
            const url = request.url.substr(7)

            callback({
                path: path.normalize(__dirname + '/' + url)
            });
        },
        error => {
            if (error) {
                console.log('No! Failed to register atom:// protocol')
            }else{
                console.log('OK! Regsitered atom:// protocol')
            }
        }
    )

    mainWindow = new BrowserWindow({
        width : 800,
        height: 650,
        frame : false,
        resizable: false,
        center: true
    })

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('file://' + __dirname + '/app/bootstrap/development.html')
        mainWindow.webContents.openDevTools()
    }else{
        mainWindow.loadURL('file://' + __dirname + '/app/bootstrap/production.html')
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', (event, hasVisibleWindows) => {
    if (hasVisibleWindows === false) {
        openMainWindow()
    }
})

app.on('ready', () => openMainWindow())
