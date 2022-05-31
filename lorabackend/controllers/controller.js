class controller{

    constructor(serv, options){
        this.service = new serv();
        console.log("ID:",this.service.modelId);
        this.options = options;

        this.update = this.update.bind(this);
        this.getAll = this.getAll.bind(this);
        this.delete = this.delete.bind(this);
        this.getOneById = this.getOneById.bind(this);
        this.create = this.create.bind(this);
        this.updateOrCreate = this.updateOrCreate.bind(this);
    }

    update(req, res){
        try {
            this.service.update(req.body.id, req.body.model, (validar, msg) => {
                if(validar){
                    res.status(200).json({msg: msg, correct: true});
                }else{
                    res.status(400).json({msg: msg, correct: false});
                }
            });
        } catch (error) {
            console.log("Error: ", error);
            
            res.status(500).json({msg: "error", correct: false});
        }
    }

    getAll(req,res){
        try {
            console.log("ID in get:",this.service.modelId);
            this.service.getAll( (validar, docs) => {
                if(validar){
                    res.status(200).json({msg: "ok", correct: true, docs: docs});
                }else{
                    res.status(400).json({msg: "error", correct: false, docs: []});
                }
            });
        } catch (error) {
            console.log("Error: ", error);
            
            res.status(500).json({msg: "error", correct: false, docs: []});
        }
    }

    getOneById(req, res){
        try {
            this.service.getOneById(req.query.id, (validar, docs) => {
                if(validar){
                    res.status(200).json({msg: "ok", correct: true, docs: docs});
                }else{
                    res.status(500).json({msg: "error", correct: false, docs: {}});
                }
            });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({msg: "error", correct: false, docs: {}});
        }
        
    }

    delete(req, res){
        try {
            this.service.delete(req.body.id, (validar, msg) => {
                if(validar){
                    res.status(200).json({msg: msg, correct: true});
                }else{
                    
                    res.status(400).json({msg: msg, correct: false});
                }
            });
        } catch (error) {
            console.log("error: ", error);
            
            res.status(500).json({msg: msg, correct: false});
        }
    }

    create(req, res){
        try {
            this.service.create(req.body.model,(validar) => {
                if(validar){
                    res.status(201).json({correct: true, msg: "ok"});
                }else{
                    res.status(400).json({correct: false, msg: "error"});
                }
            });
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({correct: false, msg: "error"});
        }
    }

    updateOrCreate(req, res){
        try {
            this.service.updateOrCreate(req.body.id, req.body.model, (validar) => {
                if(validar){
                    res.status(201).json({correct: true, msg: "ok"});
                }else{
                    res.status(400).json({correct: false, msg: "error"});
                }
            });
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({correct: false, msg: "error"});
        }
    }
}

module.exports  = controller;