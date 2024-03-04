const express = require("express");
// const { users } = require("./data/users.json");
const userRoute = require("./routes/users");
const bookRoute = require("./routes/books");
//const kill = require("kill-port");

const app = express();
const PORT = 8080;
//kill(8080, "tcp");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server started",
  });
});

app.use("/users", userRoute);
app.use("/books", bookRoute);
app.get("*", (req, res) => {
  res.status(501).json({
    Error: "INVALID PATH",
    message: "not implimented yet",
  });
});

app.listen(PORT, () => {
  console.log("server started running on port ", PORT);
});
