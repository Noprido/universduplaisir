const router = require("express").Router();

const memberController = require("../controllers/memberController");


router.get("/", memberController.dashboard);


router.get("/profile", memberController.profile);


router.get("/events", memberController.events);


router.get("/pass", memberController.pass);


module.exports = router;