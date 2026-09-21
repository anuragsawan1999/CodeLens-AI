const Repository = require("../models/Repository");


// ==========================
// Create Repository
// ==========================
exports.createRepository = async (req, res) => {
  try {
    const { name, description } = req.body;

    const repo = await Repository.create({
      name,
      description,
      owner: req.user.id
    });

    res.json({
      message: "Repository Created",
      repo
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};



// ==========================
// Add File to Repository
// ==========================
exports.addFile = async (req, res) => {
  try {
    const { filename, code } = req.body;

    const repo = await Repository.findById(req.params.id);

    if (!repo) {
      return res.status(404).json({
        message: "Repository not found"
      });
    }

    repo.files.push({
      filename,
      code
    });

    await repo.save();

    res.json({
      message: "File added",
      repo
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};



// ==========================
// Get My Repositories
// ==========================
exports.getMyRepositories = async (req, res) => {
  try {
    const repos = await Repository.find({
      owner: req.user.id
    });

    res.json({
      repos
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};



// ==========================
// Get Single Repository
// ==========================
exports.getRepositoryById = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);

    if (!repo) {
      return res.status(404).json({
        message: "Repository not found"
      });
    }

    res.json({
      repo
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};



// ==========================
// Delete Repository
// ==========================
exports.deleteRepository = async (req, res) => {
  try {
    const repo = await Repository.findById(req.params.id);

    if (!repo) {
      return res.status(404).json({
        message: "Repository not found"
      });
    }

    await repo.deleteOne();

    res.json({
      message: "Repository deleted"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};