const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class bookModel {
  static async findBooks() {
    return prisma.books.findMany({
      where: {
        stock: { gt: 0 },
      },
      select: {
        code: true,
        title: true,
        author: true,
        stock: true,
      },
    });
  }

  static async findBookByCode(bookCode) {
    return prisma.books.findUnique({
      where: {
        code: bookCode,
        stock: { gt: 0 },
      },
    });
  }

  static async updateBookStockBorrow(bookCode, stock) {
    const newStock = stock - 1;
    return prisma.books.update({
      where: { code: bookCode },
      data: {
        stock: newStock,
      },
    });
  }

  static async findBook(bookCode) {
    return prisma.books.findUnique({
      where: { code: bookCode },
    });
  }

  static async updateBookStockReturn(bookCode, stock) {
    const newStock = stock + 1;
    return prisma.books.update({
      where: { code: bookCode },
      data: {
        stock: newStock,
      },
    });
  }
}

module.exports = bookModel;
