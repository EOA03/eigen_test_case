const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book-controller");
const memberController = require("../controllers/member-controller");
const checkPenaltyStatus = require("../middlewares/penalty-check");

router.get("/books", bookController.getAllBooks);

router.get("/members", memberController.getAllMembers);

router.post(
  "/borrow/:memberCode/:bookCode",
  checkPenaltyStatus,
  memberController.memberBorrowBook
);

router.post("/return/:memberCode/:bookCode", memberController.memberReturnBook);

module.exports = router;
