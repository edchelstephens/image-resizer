const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== "production";




function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Image Resizer',
        width: isDev ? 1000 : 500,
        height: 600
    })

    if (isDev) {

        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        title: 'About',
        width: 300,
        height: 300,
    })

    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'))
}

const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: 'About',
                click: createAboutWindow
            }
        ]
    }] : []),
    {
        role: 'fileMenu'
    },
    ...(!isMac ? [{
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click: createAboutWindow
            }

        ]
    }] : [])
]

app.whenReady().then(
    () => {
        createMainWindow();

        const mainMenu = Menu.buildFromTemplate(menu);
        Menu.setApplicationMenu(mainMenu);

        app.on('active', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createMainWindow();
            }
        })
    }
);


app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})