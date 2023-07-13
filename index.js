require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const rateRouter = require("./routers/rate");
const commentRouter = require("./routers/comment");
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/rate", rateRouter);
app.use("/comment", commentRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}`);
});
