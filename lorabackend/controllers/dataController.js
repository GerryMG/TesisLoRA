const dataService = require("../services/dataService");
const controller = require("./controller");



class dataController extends controller{
    constructor(){
        super(dataService, {});
        
    }
}

module.exports = dataController;