const http = require('http');

const options = {
  host: 'ipv4bot.whatismyipaddress.com',
  port: 80,
  path: '/'
};

const getExternalIp = () => {
  return new Promise(resolve => {
    http.get(options, (res) => {
      res.on("data", (chunk) => {
        resolve(chunk);
      });
    }).on('error', (e) => {
      console.log("error: " + e.message);
    });
  })
}

module.exports = getExternalIp;
