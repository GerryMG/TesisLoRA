var express = require('express');
const sensorsController = require('../controllers/sensorsController');
var router = express.Router();
const sensors = new sensorsController();


router.get("/", sensors.getAll);
router.get("/id", sensors.getOneById);
router.post("/", sensors.create2);
router.delete("/", sensors.delete2);
router.put("/", sensors.update2);
router.put("/upsert", sensors.updateOrCreate);



module.exports = router;
