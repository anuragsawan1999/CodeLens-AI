const express = require("express");
const router = express.Router();

const {
  createRepository,
  addFile,
  getMyRepositories,
  getRepositoryById,
  deleteRepository
} = require("../controllers/repoController");

const authMiddleware = require("../middleware/authMiddleware");


// Create repo
router.post("/create", authMiddleware, createRepository);

// Add file
router.post("/:id/add-file", authMiddleware, addFile);

// Get all repos of user
router.get("/my-repos", authMiddleware, getMyRepositories);

// Get single repo
router.get("/:id", authMiddleware, getRepositoryById);

// Delete repo
router.delete("/:id", authMiddleware, deleteRepository);


module.exports = router;