const app = require('../src/app');
const debug = require('debug')('balta:server');
// Com SSL
// const https = require('https');

// Sem SSL
const http = require('http');
const fs = require('fs');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/SSL/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/SSL/cert.pem', 'utf8');

const port = normalizePort(process.env.PORT || '44666');
app.set('port', port);

const credentials = { key: privateKey, cert: certificate };
// Com SSL
// const server = https.createServer(credentials, app);

// Sem SSL
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

function normalizePort(val) {
  const _port = parseInt(val, 10);

  if (isNaN(_port)) {
    return val;
  }

  if (_port >= 0) {
    return _port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
