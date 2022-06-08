const data = require("../models/data");

const service = require("./service");

class dataService  extends service{
    constructor() {
        super(data,
            {ok: "data creada", err: "No se pudo crear la data"},
            {ok: "data actualizada", err: "No se pudo actualizar la data"},
            {ok: "data eliminada", err: "No se pudo eliminar la data"});
    }


    getAllByTime(fid,id,time1,time2,cb) {
        try {
            let fds = "data." + fid;
            var conditions = {fds: id,time: {$gte: time1, $lte: time2}};
            
            this.model.find(conditions, (err, doc) => {
                if (err) {
                    console.log("err: ", err);
                    cb(false, []);
                } else {
                    cb(true, doc);
                }
            }).sort({time: -1});
        } catch (error) {
            console.log("error: ", error);
            cb(false, []);
        }
    }
}

module.exports = dataService;