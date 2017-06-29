var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
});

app.post('/', function(req, res) {
  const buffer = [];
  
  req.on('data', (data) => buffer.push(data.toString()));
  req.on('end', () => {
    res.end();

    const json = JSON.parse(buffer.join(''));
    console.dir(json, {depth: 10});
    console.log('');
    
    io.emit('webhook', json);
  });
});

function configOrDefault(envVar, defaultValue) {
  if (typeof envVar === 'string') {
    return envVar;
  }
  return defaultValue;
}

const port = configOrDefault(process.env.SOCKETCTRL_PORT, 3003);

http.listen(port, function(){
  console.log('listening on *:' + port);
});
