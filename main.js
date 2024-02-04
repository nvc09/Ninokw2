'use strict';
var starttime = new Date().getTime();
const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const helmet = require("helmet");
const server = require("./server.js");
const app = express();
const rateLimit = require("express-rate-limit");
const getIP = require('ipware')().get_ip;
const checkIPBlocked = require('./blockIp.js');
const blockedIPs = JSON.parse(fs.readFileSync('./blockedIP.json', { encoding: 'utf-8' }));
const handleBlockIP = rateLimit({
    windowMs: 60 * 1000,
    max: 650,
    handler: function (req, res, next) {
        const ipInfo = getIP(req);
        const ip = ipInfo.clientIp;
        if (!blockedIPs.includes(ip)) {
            blockedIPs.push(ip);
            fs.writeFileSync('./blockedIP.json', JSON.stringify(blockedIPs, null, 2));
            console.log(`[ RATE LIMIT ] → Đã block IP: ${ip}`);
        }
        next();
    }
});
app.use(handleBlockIP);
app.use(checkIPBlocked);
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    var color = ["\x1b[31m", "\x1b[32m", "\x1b[33m", '\x1b[34m', '\x1b[35m', '\x1b[36m', '\x1b[37m', "\x1b[38;5;205m", "\x1b[38;5;51m", "\x1b[38;5;197m", "\x1b[38;5;120m", "\x1b[38;5;208m", "\x1b[38;5;220m", "\x1b[38;5;251m"];
    var more = color[Math.floor(Math.random() * color.length)];
    console.log(more + '[ IP ] → ' + ipInfo.clientIp + ' - Đã yêu cầu tới folder:' + decodeURIComponent(req.url));
    next();
});
app.post('/')
app.use("/", server);
app.set("json spaces", 4);
app.use((error, req, res, next) => {
    res.status(error.status).json({ message: error.message });
});
///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////
app.set('port', (process.env.PORT || 8080));
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');

}).listen(app.get('port'), function() {
    console.log('\x1b[36m=====================================================\n\x1b[38;5;220m[ START ] \x1b[33m→\x1b[38;5;119m Máy chủ TNT đang chạy trên PORT\x1b[38;5;208m', app.get('port'), '\n\x1b[36m=====================================================\n');
});

var totaltime = (new Date().getTime() - starttime)/1000;
console.log("\x1b[38;5;220m[ LOADING ] \x1b[33m→\x1b[35m Thời gian khởi động: "+Math.round(totaltime*100)/100+" ms");
console.log("\x1b[38;5;205m[ RAIDEN API ] \x1b[33m→\x1b[38;5;51m Khởi động API của TNT thành công");
// bank
async function bank() {
const { writeFileSync } = require('fs-extra');
const { join } = require('path');
const pathData = join(__dirname, "public", "bank", "data", "bank.json");
const user = require('./public/bank/data/bank.json');
    if(user[0] == undefined ) return
    while(true) {
      for (let id of user) {
        var userData = user.find(i => i.senderID == id.senderID);
        var money = userData.data.money;
        userData.data.money = parseInt(money) + parseInt(money) * 0.005
        writeFileSync(pathData, JSON.stringify(user, null, 2));
      }
      console.log("\x1b[38;5;220m[ BANKING ] \x1b[33m→ \x1b[35mĐang trong quá trình xử lí banking ...");
      await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000))
    }
}
bank()
// -------------------------->      END     <-------------------------------//