const { UserModel, BookModel } = require("../models/index");
const IssuedBook = require("../dtos/book-dtos");

//to Fetch all books
exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find();
  if (books.length <= 0) {
    return res.status(404).json({
      success: false,
      message: "Don't have any books",
    });
  }
  return res.status(200).json({
    success: true,
    message: "All Books fetched Successfully",
    data: books,
  });
};
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book id Not found",
    });
  }
  // console.log("request data", req);
  return res.status(200).json({
    success: true,
    message: "Found The Book By Their Id",
    data: book,
  });
};
exports.getAllIssuedBook = async (req, res) => {
  const Users = await UserModel.find(
    { issuedBook: { $exists: true } }.populate("issuedBook")
  );
  if (!Users) {
    return res.status(400).json({
      success: false,
      message: "successfuly got all issued book",
    });
  }
  // console.log(Users);
  const issuedBooks = Users.map((each) => new IssuedBook(each));
  if (issuedBooks.length <= 0) {
    return res.status(404).json({
      success: false,
      message: "dont have any issued book",
    });
  }
  res.status(404).json({
    success: false,
    message: "dont have any issued book",
    data: issuedBooks,
  });
};

exports.addNewbook = async (req, res) => {
  const { data } = req.body;
  console.log("hii");
  if (!data) {
    return res.status(400).json({
      sucess: false,
      message: "No Data To Add A Book",
    });
  }
  await BookModel.create(data);
  const allBooks = await BookModel.find();

  return res.status(201).json({
    success: true,
    message: "Added Book Succesfully",
    data: allBooks,
  });
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "invalid Body",
    });
  }
  const updatedBook = await BookModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return res.status(200).json({
    success: true,
    message: "updated suceessfuly",
    data: updatedBook,
  });
};
