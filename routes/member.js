const router = require("express").Router();

const memberController = require("../controllers/memberController");

const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/dashboard', memberController.dashboard);


router.get("/", memberController.dashboard);


router.get("/profile", memberController.profile);


router.get("/events", memberController.events);


router.get("/pass", memberController.pass);


module.exports = router;