const fs = require('fs')

const logServerRequests = (req, res, next) => {
    console.log(`Request-type="${req.method}", Request-path="${req.path}", Request-timestamp="${(new Date()).toISOString()}"`);
    fs.appendFile('requests-logs.txt', `Request-type="${req.method}", Request-path="${req.path}", Request-timestamp="${(new Date()).toISOString()}"\n`, (err) => { if (err) throw err; })
    next();
}

module.exports = logServerRequests