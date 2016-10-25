const net = require('net');
const ChatRoom = require('./chatRoom');
const chatRoom = new ChatRoom();

module.exports = net.createServer(client => {
  client.setEncoding('utf-8');

  chatRoom.add(client);

  client.on('data', message => {
    if(message.substring(0,8) === '/newName'){
      chatRoom.changeNick(client, message);
    } else if (message.substring(0,10) === '/newRandom'){
      chatRoom.changeNickRandom(client, message);
    } else {
      chatRoom.send(client, message);
    }
  });
  
  client.on('close', () => {
    chatRoom.remove(client);
  });

});

// const port = 65000;
// server.listen(port, err => {
//   if (err) console.log('error!', err);
//   else console.log('server listening on port', port);
// });

