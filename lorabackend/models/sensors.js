var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sensorSchema = new Schema(
    {
        name: {type: String,require: true},
        id: { type: String, unique: true, require: true },
        meta: { type: Object, require: true },
        topic: { type: String, required: true },
        // v3/{application id}@{tenant id}/devices/{device id}/up
        category: {type: String, require: true},
        latitud_value: { type: Number },
        longitud_value: { type: Number },
        id_field: { type: String },
    }
);

// {
//     time: "tiempo or -1",
//     ...
// }

module.exports = mongoose.model("sensors", sensorSchema);