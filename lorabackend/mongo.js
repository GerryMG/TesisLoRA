var mongoose = require('mongoose');
const { MONGO_URL} = require("./config");




// var mongoDB = MONGO_ENGINE_URL_PREFIX + encodeURIComponent(MONGO_USER_PASS) + MONGO_SUFIX;
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.info("The mongo connection is running correctly");
});

module.exports = db;