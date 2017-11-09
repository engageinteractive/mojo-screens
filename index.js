var express = require('express');
var cons = require('consolidate');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', cons.swig)

app.set('view engine', 'html')
app.set('views', __dirname + '/public/views')

console.log(process.env.SONOS_API_HOST);

app.get('/', function(req, res){
  res.render('index', {
    host: process.env.SONOS_API_HOST
  })
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