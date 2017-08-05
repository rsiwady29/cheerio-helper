const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cheerio = require('cheerio');
const gzippo = require('gzippo');


var $ = undefined;

app.use(gzippo.staticGzip("" + __dirname + "/src/"));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/index.html');
});

http.listen(process.env.PORT || 8000, function(){
  console.log('listening on *:8k');
});

io.on('connection', function(socket){
  socket.on('htmlUpdate', function(html){
      if (html !== undefined && html !== null) {
        $ = cheerio.load(html);
      }
  });
  socket.on('eval', function(code) {
      try {
		  console.log(code);
          const result = eval(code);
          socket.emit('result', result);
      } catch (e) {
          socket.emit('result', e);
      }
  });
});
