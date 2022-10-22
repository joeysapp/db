//                 __
// .-----.-----.--|  |.-----.
// |     |  _  |  _  ||  -__|
// |__|__|_____|_____||_____|
// ================================================================================
// https://github.com/websockets/ws
// https://www.npmjs.com/package/pg
// https://github.com/mongodb/node-mongodb-native

import { createServer } from 'http';
import { parse } from 'url';
import { WebSocketServer } from 'ws';


//         __   __ __
// .--.--.|  |_|__|  |.-----.
// |  |  ||   _|  |  ||__ --|
// |_____||____|__|__||_____|
// ========================================
const toMsg = (msg, {
  action: '',
  type: 'log',
  action: '',

  to: '',
  from: '',

  timestamp: new Date(),
} => {
  return JSON.stringify({ msg, type, action, timestamp });
}





// .--.--.--.-----.-----.
// |  |  |  |__ --|__ --|
// |________|_____|_____|
// ========================================
const wss = new WebSocketServer({ noServer: true, perMessageDeflate: false });
wss.on('connection', (ws, req) => {

  console.log('connection (ws, req)', ws, req);
  const greeting = toMsg(
    'WSS: Greetings',
    { type: 'log', to: 'client', from: 'server' });
  ws.send(toMsg('WSS: Greetings ', ));

  // Receiving stuff
  ws.on('message', jsonBuffer => {
    let msg = {};
    try {
      msg = toMsg(JSON.parse(jsonBuffer));
    } catch {
      msg = toMsg('Error parsing JSON Buffer object', { type: 'error' });
    }    
    console.log('on message (jsonBuffer)', msg);
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

  // Pathname could be used for different behavior / multiple WSS at once
  const { pathname } = parse(request.url);
  if (pathname === '/') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }

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
