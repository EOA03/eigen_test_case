const bookModel = require("../models/book-model");
const { successResponse, errorResponse } = require("../utils/response");

exports.getAllBooks = async (req, res) => {
  try {
    const existingBooks = await bookModel.findBooks();

    if (!existingBooks) {
      return errorResponse(res, "Books not found", 403);
    }

    return successResponse(res, "Success get all books", existingBooks, 201);
  } catch (error) {
    return errorResponse(res, "Server error", 500);
  }
};
