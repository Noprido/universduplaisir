const router = require("express").Router();
const adminController = require("../controllers/adminController");
const adminMiddleware = require("../middleware/admin");

router.use(adminMiddleware);

router.get("/", adminController.dashboard);
router.post("/validate/:id", adminController.validateMember);
router.post("/reject/:id", adminController.rejectMember);
router.get("/events", adminController.events);
router.post("/events/add", adminController.addEvent);
router.post("/events/delete/:id", adminController.deleteEvent);

module.exports = router;