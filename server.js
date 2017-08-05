const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cheerio = require('cheerio');

var $ = undefined;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(8000, function(){
  console.log('listening on *:8k');
});

io.on('connection', function(socket){
  socket.on('htmlUpdate', function(html){
      if (html !== undefined && html !== null) {
        $ = cheerio.load(html);
      }
      console.log(html);
  });
  socket.on('eval', function(code) {
      try {
          const result = eval(code);
          socket.emit('result', result);
      } catch (e) {
          socket.emit('result', e);
      }

  });
});
