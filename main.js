const {app, BrowserWindow, Menu} = require('electron');
let win, aboutClick = 0;

function about () {
    if (aboutClick == 0) {

        win = new BrowserWindow({width: 398, height: 180});
        win.loadFile('pages/about.html');
        win.setResizable(false);
        win.setMenu(null);
        aboutClick++;
        win.on('closed', () => {
            win = null;
            aboutClick--;
        });
        app.on('ready', about);
    } else {
        win.focus();
    }
}

function createWindow () {
    win = new BrowserWindow({});
    win.maximize();
    win.loadFile('pages/home.html');
    // win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
        app.quit();
    });
    const menu = Menu.buildFromTemplate([
        {
            label: 'Dosya',
            submenu: [
                {label: 'Kayıtlar'},
                {label: 'Kayıt Ekle'},
                {type: 'separator'},
                {
                    label: 'Çıkış',
                    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click () {
                        app.quit();
                    }
                }
            ]
        },
        {
          label: 'Hakkında',
          click () {
            about();
          }
        }
    ]);
    Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

