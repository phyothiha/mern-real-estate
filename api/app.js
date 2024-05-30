const express = require("express");

const PORT = 8080;

const app = express();

app.use(express.json());

// Routes
const posts = require("./routes/posts.route");
const auth = require("./routes/auth.route");

app.use("/api/posts", posts);
app.use("/api/auth", auth);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
