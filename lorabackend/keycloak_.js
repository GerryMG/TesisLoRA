var session = require("express-session");
var Keycloak = require("keycloak-connect");

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({store: memoryStore});

module.exports.keycloak = keycloak;
module.exports.memoryStore = memoryStore;