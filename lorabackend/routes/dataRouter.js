var express = require('express');
const dataController = require('../controllers/dataController');
var router = express.Router();
const data = new dataController();


router.get("/", data.getAll);
router.get("/id", data.getOneById);
router.post("/", data.create);
router.delete("/", data.delete);
router.put("/", data.update);
router.put("/upsert", data.updateOrCreate);



module.exports = router;
