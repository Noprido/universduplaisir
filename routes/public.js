const router = require("express").Router();

const publicController = require("../controllers/publicController");


router.get("/", publicController.home);

router.get("/about", publicController.about);

router.get("/events", publicController.events);

router.get("/inscription", publicController.inscription);


module.exports = router;