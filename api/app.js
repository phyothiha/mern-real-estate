const express = require("express");

const PORT = 8080;

const app = express();

// Routes
const posts = require("./routes/posts.route");

app.use("/api/posts", posts);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
