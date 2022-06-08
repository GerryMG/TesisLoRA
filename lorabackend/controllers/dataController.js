const dataService = require("../services/dataService");
const controller = require("./controller");



class dataController extends controller{
    constructor(){
        super(dataService, {});
        this.getAllByTime = this.getAllByTime.bind(this);
    }

    getAllByTime(req,res){
        try {
            console.log(req.query.field_id);
            console.log("ID in get:",this.service.modelId);
            this.service.getAllByTime( req.query.field_id,req.query.id,req.query.time1,req.query.time2, (validar, docs) => {
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

}

module.exports = dataController;