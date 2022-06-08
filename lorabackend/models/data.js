var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var dataSchema = new Schema(
    {
        data: { type: Object, require: true },
        time: {type: Date, default: Date.now}
    }
);

// {
//     time: "tiempo or -1",
//     ...
// }

module.exports = mongoose.model("data", dataSchema);