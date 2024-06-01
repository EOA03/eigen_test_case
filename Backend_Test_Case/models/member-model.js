const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class memberModel {
  static async findMembers() {
    return prisma.member.findMany({
      select: {
        code: true,
        name: true,
        total_books: true,
      },
    });
  }

  static async findMemberByCode(memberCode) {
    return prisma.member.findUnique({
      where: {
        code: memberCode,
      },
    });
  }

  static async updatePenaltyStatus(memberCode) {
    return prisma.member.update({
      where: { code: memberCode },
      data: {
        status: "ACTIVE",
        penalty_end_date: null,
      },
    });
  }

  static async updateTotalBooksBorrow(memberCode, totalBooks) {
    const newTotalBooks = totalBooks + 1;
    return prisma.member.update({
      where: { code: memberCode },
      data: {
        total_books: newTotalBooks,
      },
    });
  }

  static async updateTotalBooksReturn(memberCode, totalBooks) {
    let newTotalBooks = totalBooks - 1;
    if (newTotalBooks == 0) {
      newTotalBooks = null;
    }
    return prisma.member.update({
      where: { code: memberCode },
      data: {
        total_books: newTotalBooks,
      },
    });
  }

  static async getPenalty(memberCode) {
    const now = new Date();
    const penaltyDate = new Date(now);
    penaltyDate.setDate(now.getDate() + 3);

    return prisma.member.update({
      where: { code: memberCode },
      data: {
        status: "PENALTY",
        penalty_end_date: penaltyDate,
      },
    });
  }
}

module.exports = memberModel;
