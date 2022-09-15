const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
const path = require('path');
const nanoid = require('nanoid')

const wss = new WebSocket.Server({ server:server });

wss.on('connection', function connection(ws, req) {
  ws.id = nanoid(10)
  ws.send(JSON.stringify({connectionId: ws.id}));
  ws.on('message', function incoming(message) {
    // console.log('pointer event: %s', message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
    
  });
  ws.on('close', function () {
    console.log('i was closed')
    delete ws.id
  })
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
})

server.listen(5000, () => console.log(`Lisening on port :5000`))