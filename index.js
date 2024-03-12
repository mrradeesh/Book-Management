const express = require("express");
const userRoute = require("./routes/users");
const bookRoute = require("./routes/books");
const dotenv = require("dotenv");
//if we invoke any method from controllers then we shoul invoke that perticular controller
//const { getAllBooks } = require("./controllers/book-controller");
const dbconnection = require("./databaseConnection");
dbconnection();
dotenv.config();

const app = express();
const PORT = 8080;
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
