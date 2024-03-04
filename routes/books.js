const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();

router.get("/", (req, res) => {
  if (books.length <= 0) {
    return res.status(404).json({
      success: false,
      message: "NO Books in store",
    });
  }
  res.status(200).json({
    success: true,
    message: "successfully fetched data",
    data: books,
  });
});

router.get("/issued", (req, res) => {
  const userIsssueBook = users.filter((each) => {
    if (each.issuedBook) {
      return each;
    }
  });
  if (!userIsssueBook) {
    return res.status(404).json({
      success: false,
      message: "nod issued book found",
    });
  }
  const issuedBookF = [];
  const userIssued = userIsssueBook.forEach((userdata) => {
    book = books.find((each) => each.id == userdata.issuedBook);

    book.issuedBy = userdata.name;
    book.issuedDate = userdata.issuedDate;
    book.returnDate = userdata.returnDate;
    issuedBookF.push(book);
  });
  res.status(200).json({
    success: true,
    message: "got all the issued book",
    data: issuedBookF,
  });
});

router.post("/", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No data found to add" });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res
      .status(409)
      .json({ success: false, message: "book ID already Exist" });
  }
  books.push(data);
  res.status(201).json({
    success: true,
    message: "Book added successfully",
    data: books,
  });
});
router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  console.log(id);
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Invalid ID",
    });
  }
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "Plz send request with body",
    });
  }
  const updatebook = books.map((each) => {
    if (each.id == id) {
      return { ...each, ...data };
    }
    return each;
  });
  res.status(200).json({
    success: true,
    message: "book update success",
    data: updatebook,
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res
      .status(404)
      .json({ success: false, message: "Book Id is invalid" });
  }
  res
    .status(200)
    .json({ success: true, message: "book fetched successfully", data: book });
});

module.exports = router;
