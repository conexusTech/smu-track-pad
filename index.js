const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
const path = require('path');

const wss = new WebSocket.Server({ server:server });

wss.on('connection', function connection(ws, req) {
  console.log(req.url)
  console.log('A new client Connected!');
  ws.on('message', function incoming(message) {
    // console.log('pointer event: %s', message);
    console.log(wss.clients)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    
  });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
})

server.listen(3000, () => console.log(`Lisening on port :3000`))