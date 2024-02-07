var express = require('express')
  , bodyParser = require('body-parser');

var expressWs = require('express-ws');

var app = express();
var events = require('events');
var eventEmitter = new events.EventEmitter();

app.use(bodyParser.json());
var expressWs = expressWs(express());
var app = expressWs.app;

app.use(express.static('public'));

var aWss = expressWs.getWss('/');
app.use(bodyParser.json());
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/buzzer", (request, response) => {

  response.send("hi")
  eventEmitter.emit('buttonPressed', request.body);
})

//eventEmitter.on('buttonPressed',)


app.ws('/', function (ws, req) {

  eventEmitter.on('buttonPressed', function (body) {
    dataStr = JSON.stringify(body)
    ws.send(dataStr)
  })
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})