const express = require("express");
const rateController = require("../controllers/rate");
const router = express.Router();
const { verifyJwt } = require("../middleware/auth");

// router.get("/", verifyJwt, rateController.getAllRatings);
router.get("/", verifyJwt, rateController.getAllRatings);
router.get("/:id", verifyJwt, rateController.getRatingById);
router.post("/", verifyJwt, rateController.createRating);
router.put("/:id", verifyJwt, rateController.updateRatingByID);
router.delete("/:userID", verifyJwt, rateController.deleteRating);

module.exports = router;
