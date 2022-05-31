const sensorService = require("../services/sensorsService");
const controller = require("./controller");



class sensorsController extends controller{
    constructor(){
        super(sensorService, {});
        this.create2 = this.create2.bind(this);
        this.update2 = this.update2.bind(this);
    }

    create2(req, res){
        try {
            let auxmodel = req.body.model;
            let kys = Object.keys(req.body.model.meta);
            let pass = false;
            kys.forEach(ele=>{
                if(auxmodel.meta[ele].type == "id"){
                    auxmodel.id_field = ele;
                    pass = true;
                }
                if(auxmodel.meta[ele].type == "latitud"){
                    auxmodel.latitud = ele;
                }
                if(auxmodel.meta[ele].type == "longitud"){
                    auxmodel.longitud = ele;
                }
            });
            if(pass){
                this.service.create(auxmodel,(validar) => {
                    if(validar){
                        let client = req.app.get("mqt");
                        client.subscribe(req.body.model.topic, function (err) {
                            if (!err) {
                              console.log("suscribe to " + req.body.model.topic);
                            }
                          });
    
                        res.status(201).json({correct: true, msg: "ok"});
                    }else{
                        res.status(400).json({correct: false, msg: "error"});
                    }
                });
            }else{
                res.status(400).json({correct: false, msg: "no hay id en el meta"});
            }
          
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({correct: false, msg: "error"});
        }
    }

    update2(req, res){
        try {
            this.service.getOneById(req.body.id,(validar1,doc)=>{
                if(validar1){
                    this.service.update(req.body.id, req.body.model, (validar, msg) => {
                        if(validar){
                            let client = req.app.get("mqt");
                            try {
                                client.unsubscribe(doc.topic, function (err) {
                                    if (!err) {
                                        console.log("unsubscribe to " + doc.topic);
                                      client.subscribe(req.body.model.topic,function (err) {
                                        if (!err) {
                                            console.log("suscribe to " + req.body.model.topic);
                                        }
                                      })
                                    }
                                  });
                            } catch (error) {
                                console.log(error);
                            }
                           
                            res.status(200).json({msg: msg, correct: true});
                        }else{
                            res.status(400).json({msg: msg, correct: false});
                        }
                    });
                }else{
                    res.status(400).json({msg: msg, correct: false});
                }
            })
            
        } catch (error) {
            console.log("Error: ", error);
            
            res.status(500).json({msg: "error", correct: false});
        }
    }
}

module.exports = sensorsController;