const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class borrowbookModel {
  static async memberBorrowBook(memberCode, bookCode) {
    const borrowDate = new Date();
    const returnDate = new Date(borrowDate);
    returnDate.setDate(borrowDate.getDate() + 7);

    return prisma.borrowedBooks.create({
      data: {
        member_code: memberCode,
        book_code: bookCode,
        borrow_date: borrowDate,
        return_date: returnDate,
      },
    });
  }

  static async findBorrowedBook(memberCode, bookCode) {
    return prisma.borrowedBooks.findFirst({
      where: {
        member_code: memberCode,
        book_code: bookCode,
        returned_yet: false,
      },
    });
  }

  static async memberReturnBook(id) {
    return prisma.borrowedBooks.update({
      where: {
        id: id,
      },
      data: {
        returned_yet: true,
      },
    });
  }
}

module.exports = borrowbookModel;
