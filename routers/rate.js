const express = require("express");
const rateController = require("../controllers/rate");
const router = express.Router();
const { verifyJwt } = require("../middleware/auth");

// router.get("/", verifyJwt, rateController.getAllRatings);
router.get("/", rateController.getAllRatings);
router.get("/:id", rateController.getRatingById);
router.post("/", rateController.createRating);
router.put("/:id", rateController.updateRatingByID);
router.delete("/:userID", rateController.deleteRating);

module.exports = router;
