docker build -t lorabackend .

docker run -dp 3001:3001 -e PORT=3001 -e MONGO_URL=mongodb://root:example@192.168.56.1:27017/?authMechanism=DEFAULT -e MQTT_URL=192.168.56.1:1883 -e MQTT_PROTOCOL="mqtt" lorabackend
