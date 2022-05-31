const data = require("../models/data");

const service = require("./service");

class dataService  extends service{
    constructor() {
        super(data,
            {ok: "data creada", err: "No se pudo crear la data"},
            {ok: "data actualizada", err: "No se pudo actualizar la data"},
            {ok: "data eliminada", err: "No se pudo eliminar la data"});
    }
}

module.exports = dataService;