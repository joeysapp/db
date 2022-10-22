//                 __
// .-----.-----.--|  |.-----.
// |     |  _  |  _  ||  -__|
// |__|__|_____|_____||_____|
// ================================================================================
// https://www.npmjs.com/package/pg

//         __   __ __
// .--.--.|  |_|__|  |.-----.
// |  |  ||   _|  |  ||__ --|
// |_____||____|__|__||_____|
// ========================================
// (probably in another file)
// ========================================
// Parse out JSON buffer into object, coming from sockets
const parseMessage = (jsonBuffer) => {
  return JSON.parse(jsonBuffer);
}
// Format object to string to send to sockets
const formatMessage = (_message, {
  message,
  action = '',
  type = '',
  to = '',
  from = '',
  timestamp = new Date(),
} = {}) => JSON.stringify({ message: _message || message, type, action, timestamp });





// .--.--.--.-----.-----.
// |  |  |  |__ --|__ --|
// |________|_____|_____|
// ========================================
// (think about implementing wss via c with basic networking)
// ========================================

// https://github.com/websockets/ws
import { createServer } from 'http';
import { parse } from 'url';
import { WebSocketServer } from 'ws';
// const createServer = require('http');
// const WebSocketServer = require('ws');

const wss = new WebSocketServer({ noServer: true, perMessageDeflate: false });
wss.on('connection', (ws, req) => {

  // console.log('connection (ws, req)', ws, req);
  const greeting = formatMessage(
    'WSS: Greetings',
    { type: 'log', to: 'client', from: 'server' });

  ws.send(greeting);

  // Receiving stuff
  ws.on('message', jsonBuffer => {
    let message = {};
    try {
      message = parseMessage(jsonBuffer);
    } catch {
      message = formatMessage('Error parsing JSON Buffer object', { type: 'error' });
    }    
    console.log('on message (jsonBuffer)');
    console.dir(message, { depth: null, colors: true });
  });

  // Closing
  ws.on('close', (id, socket) => {
    console.log('on close (id, socket)', id, socket);
  });
});



// .-----.-----.----.--.--.-----.----.
// |__ --|  -__|   _|  |  |  -__|   _|
// |_____|_____|__|  \___/|_____|__|
// ========================================
const server = createServer();
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });

  // Pathname could be used for different behavior / multiple WSS at once (require(url))
  // const { pathname } = parse(request.url);
  // if (pathname === '/') {
  //   wss.handleUpgrade(request, socket, head, (ws) => {
  //     wss.emit('connection', ws, request);
  //   });
  // } else {
  //   socket.destroy();
  // }

  // Auth
  // This function is not defined on purpose. Implement it with your own logic.
  // authenticate(request, function next(err, client) {
  //   if (err || !client) {
  //     socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
  //     socket.destroy();
  //     return;
  //   }
  // 
  //   wss.handleUpgrade(request, socket, head, function done(ws) {
  //     wss.emit('connection', ws, request, client);
  //   });
  // });

});
server.listen(9001);
