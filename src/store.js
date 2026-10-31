'use strict';
const fs=require('fs'),path=require('path'),os=require('os');
class SettingsStore{constructor(){this.dataDir=path.join(process.env.APPDATA||path.join(os.homedir(),'AppData','Roaming'),'MAHYAR VPN');this.file=path.join(this.dataDir,'settings.json');this.data={engine:'lantern',autoReconnect:true,minimizeToTray:true,animation:'full',language:'en',localProxy:'127.0.0.1:20840'};try{Object.assign(this.data,JSON.parse(fs.readFileSync(this.file,'utf8')))}catch{};fs.mkdirSync(this.dataDir,{recursive:true});}get(){return {...this.data}}merge(p){Object.assign(this.data,p||{});fs.writeFileSync(this.file,JSON.stringify(this.data,null,2));return this.get()}}
module.exports={SettingsStore};
