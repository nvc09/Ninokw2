const getIP = require('ipware')().get_ip;
const fs = require("fs-extra");
module.exports = function (req, res, next) {
  const listIPBlocked = JSON.parse(fs.readFileSync('./blockedIP.json', { encoding: 'utf-8' }));
  if (listIPBlocked.includes(getIP(req).clientIp)) {
    res.status(403).send({
      AUTHOR: 'TNT',
      STATUS: 'ERROR 404',
      MESSAGE: 'Cút',
      INBOX: 'TNTXTRICK'
    });
  } 
  else {
    next();
  }
}