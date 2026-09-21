require("dotenv").config();
const express = require("express");
const repoRoutes = require("./routes/repoRoutes");
const historyRoutes = require("./routes/historyRoutes");
const aiRoutes = require("./routes/aiRoutes");
const cors = require("cors");
const githubRoutes =
require("./routes/githubRoutes");
const connectDB = require("./config/db");


const app = express();

// MongoDB connect
connectDB();


app.use(cors());
app.use(express.json());
app.use("/api/history", historyRoutes);
app.use(
"/api/github",
githubRoutes
);
app.use("/api/repo",repoRoutes);
app.use("/api/ai", aiRoutes);
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);


app.get("/", (req,res)=>{
    res.send("CodeLens AI Backend Running");
});
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;


module.exports = app;