'use strict';
const {app, BrowserWindow, ipcMain, shell, Menu, Tray, nativeImage} = require('electron');
const path = require('path');
const {EngineManager} = require('./src/engine-manager');
const {SettingsStore} = require('./src/store');
let win, tray, manager, store;
function createWindow(){
  win = new BrowserWindow({width:1280,height:820,minWidth:1020,minHeight:680,frame:false,backgroundColor:'#080811',show:false,
    title:'MAHYAR VPN',icon:path.join(__dirname,'public','icon.svg'),webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false}});
  win.loadFile(path.join(__dirname,'public','index.html'));
  win.once('ready-to-show',()=>win.show());
  win.on('closed',()=>{win=null});
}
function broadcast(channel,payload){if(win&&!win.isDestroyed()) win.webContents.send(channel,payload)}
app.whenReady().then(()=>{
  store=new SettingsStore(); manager=new EngineManager({root:__dirname, dataDir:store.dataDir, onEvent:(e)=>broadcast('engine-event',e)});
  ipcMain.handle('app:get-state',()=>({settings:store.get(),engines:manager.inventory(),logs:manager.logs()}));
  ipcMain.handle('app:save-settings',(_,s)=>store.merge(s));
  ipcMain.handle('engine:start',(_,id,opts)=>manager.start(id,opts));
  ipcMain.handle('engine:stop',()=>manager.stop());
  ipcMain.handle('engine:refresh',()=>manager.snapshot());
  ipcMain.handle('engine:diagnostics',()=>manager.diagnostics());
  ipcMain.on('window:minimize',()=>win?.minimize()); ipcMain.on('window:maximize',()=>win?.isMaximized()?win.unmaximize():win?.maximize());
  ipcMain.on('window:close',()=>win?.hide()); ipcMain.on('app:quit',()=>{app.isQuitting=true;manager.stop();app.quit()});
  createWindow();
  tray=new Tray(nativeImage.createFromPath(path.join(__dirname,'public','icon.png')));
  tray.setToolTip('MAHYAR VPN'); tray.setContextMenu(Menu.buildFromTemplate([{label:'Show MAHYAR VPN',click:()=>win?.show()},{label:'Quit',click:()=>{app.isQuitting=true;manager.stop();app.quit()}}]));
});
app.on('before-quit',()=>manager?.stop());
