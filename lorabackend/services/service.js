class service {

    constructor(
        model,
        msg_create = { ok: "Created", err: "Not created" },
        msg_update = { ok: "Updated", err: "Not updated" },
        mgs_delete = { ok: "Deleted", err: "Not deleted" },
        id = "_id"
    ) {
        this.model = model;
        this.msgCreate = msg_create;
        this.msgUpdate = msg_update;
        this.msgDelete = mgs_delete;
        this.modelId = id;
        // this.updateOrCreate = this.updateOrCreate.bind(this);
        // this.create = this.create.bind(this);
        // this.get = this.get.bind(this);
        // this.getOneById = this.getOneById.bind(this);
        // this.getcount = this.getcount.bind(this);
        // this.delete = this.delete.bind(this);
        // this.update = this.update.bind(this);
    }

    updateOrCreate(id, newModel, cb) {
        try {
            var conditions = {};
            conditions[this.modelId] = id;
            this.model.updateOne(conditions, newModel, { upsert: true }, (err, doc) => {
                if (err) {
                    cb(false);
                } else {
                    cb(true);
                }
            });
        } catch (error) {
            console.log("err: ", error)
            cb(false);
        }
    }

    create(model, cb) {
        try {
            
            const newModel = new this.model(model);
            newModel.save((err, doc) => {
                if (err) {
                    console.log("err:", err)
                    cb(false);
                } else {
                    cb(true);
                }
            });
        } catch (error) {
            console.log("error: ", error);
            cb(false);
        }
    }

    update(id, newModel, cb) {
        try {
            console.log(newModel);
            var conditions = {};
            conditions[this.modelId] = id;
            this.model.updateOne(conditions, newModel, (err, doc) => {
                if (err) {
                    cb(false, this.msgUpdate.err);
                } else {
                    cb(true, this.msgUpdate.ok);
                }
            });
        } catch (error) {
            console.log("error: ", error);
            cb(false, this.msgUpdate.err);
        }
    }

    delete(id, cb) {
        try {
            var conditions = {};
            conditions[this.modelId] = id;
            this.model.deleteOne(conditions, (err, doc) => {
                if (err) {
                    cb(false, this.msgDelete.err)
                } else {
                    cb(true, this.msgDelete.ok);
                }
            });
        } catch (error) {
            console.log("error:", error);
            cb(false, this.msgDelete.err);
        }
    }

    getOneById(id, cb) {
        try {
            var conditions = {};
            conditions[this.modelId] = id;
            this.model.findOne(conditions, (err, doc) => {
                if (err) {
                    console.log("err: ", err);
                    cb(false, {});
                } else {
                    cb(true, doc);
                }
            });
        } catch (error) {
            console.log("error: ", error);
            cb(false, {});
        }
    }

    getAll(cb) {
        try {
            var conditions = {};
            
            this.model.find(conditions, (err, doc) => {
                if (err) {
                    console.log("err: ", err);
                    cb(false, []);
                } else {
                    cb(true, doc);
                }
            });
        } catch (error) {
            console.log("error: ", error);
            cb(false, []);
        }
    }

}

module.exports = service;