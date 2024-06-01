const memberModel = require("../models/member-model");
const { successResponse, errorResponse } = require("../utils/response");

const checkPenaltyStatus = async (req, res, next) => {
  const { memberCode } = req.params;
  try {
    const existingMember = await memberModel.findMemberByCode(memberCode);

    if (!existingMember) {
      return errorResponse(res, "Member not found", 404);
    }

    const now = new Date();

    if (
      existingMember.status === "PENALTY" &&
      existingMember.penalty_end_date &&
      existingMember.penalty_end_date <= now
    ) {
      await memberModel.updatePenaltyStatus(memberCode);
    }

    next();
  } catch (error) {
    errorResponse(res, "Server error", 500);
  }
};

module.exports = checkPenaltyStatus;
