# Initial Set up
1. Install Docker.
2. execute the comand.
```shell
docker compose up
```
3. Go to the mosquitto directory and execute docker compose. 
```shell
#./mosquitto inside mosquitto
 docker compose up
```
4. Now you should have installed MongoDB, keycloak and mosquitto in Docker.
```bash/bat
docker container ls
CONTAINER ID   IMAGE                              COMMAND                  CREATED       STATUS       PORTS                                                      NAMES
b68dc9e83551   quay.io/keycloak/keycloak:latest   "/opt/keycloak/bin/k…"   2 weeks ago   Up 5 hours   0.0.0.0:8080->8080/tcp, 0.0.0.0:8787->8787/tcp, 8443/tcp   tesis-keycloak-1
cc4bb1981974   mongo                              "docker-entrypoint.s…"   2 weeks ago   Up 5 hours   0.0.0.0:27017->27017/tcp                                   tesis-mongo-1
29f51a881b64   eclipse-mosquitto:latest           "/docker-entrypoint.…"   2 weeks ago   Up 5 hours   0.0.0.0:1883->1883/tcp, 0.0.0.0:9001->9001/tcp             mosquitto
```
5. Go to the lorabackend directory and execute
```bash
npm install
npm start
```

5. Now, go to the lora directory and change the proxy json ip in the package.json to your ip.
```json
{
  "browserslist": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "proxy": "http://127.0.0.1:3001"
}
```
and Then execute
```bash
npm install
npm start
```