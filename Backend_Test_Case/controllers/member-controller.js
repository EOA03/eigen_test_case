const memberModel = require("../models/member-model");
const bookModel = require("../models/book-model");
const borrowbookModel = require("../models/borrowbook-model");
const { successResponse, errorResponse } = require("../utils/response");

exports.getAllMembers = async (req, res) => {
  try {
    const existingMembers = await memberModel.findMembers();

    if (!existingMembers) {
      return errorResponse(res, "Members not found", 403);
    }

    return successResponse(
      res,
      "Success get all members",
      existingMembers,
      201
    );
  } catch (error) {
    return errorResponse(res, "Server error", 500);
  }
};

exports.memberBorrowBook = async (req, res) => {
  const { memberCode, bookCode } = req.params;
  try {
    const existingMember = await memberModel.findMemberByCode(memberCode);

    const totalBooks = existingMember.total_books;
    if (totalBooks == 2) {
      return errorResponse(res, "Member cannot borrow more than 2 books", 400);
    }

    const availableBook = await bookModel.findBookByCode(bookCode);
    if (!availableBook) {
      return errorResponse(res, "Book not available", 404);
    }

    if (existingMember.status == "PENALTY") {
      return errorResponse(res, "Member is being penalized");
    }

    const borrowBook = await borrowbookModel.memberBorrowBook(
      memberCode,
      bookCode
    );
    const updateTotalBooks = await memberModel.updateTotalBooksBorrow(
      memberCode,
      totalBooks
    );

    const bookStock = availableBook.stock;
    const updateBookStock = await bookModel.updateBookStockBorrow(
      bookCode,
      bookStock
    );

    return successResponse(res, "Success borrow book", borrowBook, 200);
  } catch (error) {
    return errorResponse(res, "Server error", 500);
  }
};

exports.memberReturnBook = async (req, res) => {
  const { memberCode, bookCode } = req.params;
  try {
    const checkBorrowedBook = await borrowbookModel.findBorrowedBook(
      memberCode,
      bookCode
    );
    if (!checkBorrowedBook) {
      return errorResponse(res, "Borrowed book not found", 404);
    }

    const borrowedBookId = checkBorrowedBook.id;
    const returnBook = await borrowbookModel.memberReturnBook(borrowedBookId);
    const existingMember = await memberModel.findMemberByCode(memberCode);
    const totalBooks = existingMember.total_books;

    const updateTotalBooks = await memberModel.updateTotalBooksReturn(
      memberCode,
      totalBooks
    );

    const book = await bookModel.findBook(bookCode);
    const stock = book.stock;
    const updateBookStock = await bookModel.updateBookStockReturn(
      bookCode,
      stock
    );

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const returnDate = checkBorrowedBook.return_date;
    if (returnDate < now) {
      const getPenalty = memberModel.getPenalty(memberCode);
      return successResponse(
        res,
        "Success return book, but you get penalty for 3 days"
      );
    }

    return successResponse(res, "Success return book");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Server error", 500);
  }
};
