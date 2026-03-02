const express = require("express");
const router = express.Router();

const {
  createLost,
  getAllLost,
  getLostById,
  updateLost,
  deleteLost
} = require("../controllers/lostController");

router.post("/", createLost);
router.get("/", getAllLost);
router.get("/:id", getLostById);
router.put("/:id", updateLost);
router.delete("/:id", deleteLost);

module.exports = router;
