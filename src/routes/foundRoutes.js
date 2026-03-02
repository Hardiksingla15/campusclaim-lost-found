const express = require("express");
const router = express.Router();

const {
  createFound,
  getAllFound,
  getFoundById,
  updateFound,
  deleteFound,claimFound, markClaimed 
} = require("../controllers/foundController");

router.post("/", createFound);
router.get("/", getAllFound);
router.get("/:id", getFoundById);
router.put("/:id", updateFound);
router.delete("/:id", deleteFound);
router.post("/:id/claim", claimFound);
router.put("/:id/mark-claimed", markClaimed);

module.exports = router;