const dotenv = require('dotenv');
dotenv.config();

configuraciones = {
   
    MONGO_URL: process.env.MONGO_URL,
    MQTT_URL: process.env.MQTT_URL,
    MQTT_USERNAME: process.env.MQTT_USERNAME,
    MQTT_PASS: process.env.MQTT_PASS
};

module.exports = configuraciones;