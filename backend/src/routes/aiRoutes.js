const express = require("express");
const router = express.Router();

const { analyzeCode } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");
const Analysis = require("../models/Analysis"); // ✅ FIX 2


// ANALYZE
router.post("/analyze", authMiddleware, analyzeCode);


// DELETE HISTORY
router.delete("/history/:id", authMiddleware, async (req, res) => {
  try {
    await Analysis.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    res.json({ success: true, message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// GET SINGLE HISTORY
router.get("/history/:id", authMiddleware, async (req, res) => {
  try {
    const data = await Analysis.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;