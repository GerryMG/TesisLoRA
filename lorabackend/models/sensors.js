var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sensorSchema = new Schema(
    {
        name: {type: String,require: true},
        id: { type: Number, unique: true, require: true },
        meta: { type: Object, require: true },
        topic: { type: String, required: true },
        access_key: { type: String },
        access_token: { type: String },
        category: {type: String, require: true},
        latitud: { type: String },
        longitud: { type: String },
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