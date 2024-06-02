const express = require("express");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const PORT = 8080;

const app = express();

app.use(express.json()).use(cookieParser());

// Routes
const posts = require("./routes/posts.route");
const auth = require("./routes/auth.route");

app.use("/api/posts", posts);
app.use("/api/auth", auth);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
