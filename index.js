var http = require('http');
var regex = /(\(.*?\))/;
http.createServer(function (req,res) {
  var info = {
    ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(/[ffff]|\:/).join(''),
    language: req.headers["accept-language"].split(",")[0],
    software: regex.exec(req.headers["user-agent"])[0].split(/\(|\)/gi).join('')
  };
  res.writeHead(200,{'Content-Type':'application/json'});
  res.write(JSON.stringify(info));
  res.end();
}).listen(process.env.PORT || 3000,function () {
  console.log('server on');
});
