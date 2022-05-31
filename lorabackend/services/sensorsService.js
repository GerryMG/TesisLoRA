const sensors = require("../models/sensors");
const service = require("./service");

class sensorService  extends service{
    constructor() {
        super(sensors,
            {ok: "sensor creado", err: "No se pudo crear el sensor"},
            {ok: "sensor actualizado", err: "No se pudo actualizar el sensor"},
            {ok: "sensor eliminado", err: "No se pudo eliminar el sensor"});
    }
}

module.exports = sensorService;