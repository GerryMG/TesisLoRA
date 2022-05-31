var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Server } = require("socket.io");
require('dotenv').config()
const mdb = require("./mongo");
var indexRouter = require('./routes/index');
const sensorRouter = require("./routes/sensorRouter");
const dataRouter = require("./routes/dataRouter");
const keycloak = require("./keycloak_");
var session = require('express-session');
var sensor = require("./models/sensors");
var data = require("./models/data");
var app = express();
const {MQTT_USERNAME,MQTT_PASS,MQTT_URL} = require("./config");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'someNastySecret',
  resave: false,
  saveUninitialized: true,
  store: keycloak.memoryStore
}));

app.use(keycloak.keycloak.middleware());

app.use('/', indexRouter);
app.use('/sensors', sensorRouter);
app.use('/data', dataRouter);

console.debug(`${MQTT_URL} ${MQTT_USERNAME} ${MQTT_PASS}`);
const mqtt = require('mqtt');
var client = mqtt.connect({
  host: `${MQTT_URL.split(":")[0]}`,
  port: MQTT_URL.split(":")[1],
  username: MQTT_USERNAME,
  password: MQTT_PASS,

  protocol: "mqtts",
  protocolVersion: 4,
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});




// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Internal Server Error");
});



var http = require('http');
const { disconnect } = require('process');
const router = require('./routes/sensorRouter');
const { route } = require('./routes/sensorRouter');
const { config } = require('dotenv');

/**
 * Get port from environment and store in Express.
 */
console.log(process.env.PORT);
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:3000"]
  }
});

app.set("io", io);
app.set("mqt", client);

io.on("connection", (socket) => {
  console.log("connnected a user");
});

io.on(disconnect, () => {

});

client.on('connect', function () {
  console.log("connected to broker");
  sensor.find({}, (err, doc) => {
    if (err) {
      console.log("err: ", err);

    } else {
      doc.forEach(ele => {
        client.subscribe(ele.topic, function (err) {
          if (!err) {
            console.log("suscribe to " + ele.topic);
          }
        });
      });
    }
  });
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(JSON.parse(message.toString()));
  io.emit("message", JSON.parse(message.toString()));
  let aux = { data: JSON.parse(message.toString()) }
  const newModel = new data(aux);
  newModel.save((err, doc) => {
    if (err) {
      console.log("err:", err)

    } else {
      console.log(doc);

    }
  });


});

client.on("error", (e)=>{
  console.log(e);
});

function putLocation() {
  sensor.find({}, (err, doc) => {
    if (err) {
      console.log("err: ", err);

    } else {
      doc.forEach(ele => {
        if (ele.latitud != "" && ele.longitud != "") {
          let auxsearch = "data." + ele.id_field;
          data.find({ auxsearch: ele.id }).sort({ time: -1 }).limit(1).exec(
            function (err, dt) {
              console.log(dt);
             
              if (!err && dt.length > 0) {
                let auxele = ele;
                auxele.latitud_value = dt[0].data[ele.latitud];
                auxele.longitud_value = dt[0].data[ele.longitud];
                sensor.updateOne({ id: ele.id }, auxele, function (err, doc) {
                  if (!err) {
                    
                  }
                });
              }

            }
          );
        }

      });
    }
  });
  console.log("run locations update");
}


setInterval(() => {
  putLocation();
}, 1000 * 60 * 10);


module.exports = server;
