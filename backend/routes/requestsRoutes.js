const express = require("express")
const router = express.Router();
const requestsController = require("../controllers/requestsController");

router.get("/", requestsController.getAllRequests);
router.get("/:clientName", requestsController.getOneRequest);
router.post("/", requestsController.createRequest);
router.put("/:id", requestsController.requestStatus);

module.exports = router;