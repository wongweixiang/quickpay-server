const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankAccountSchema = new Schema(
  {
    account_no: {
      type: String,
      required: true,
    },
    bank_abbrev: {
      type: String,
      required: true,
    },
    verification_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

module.exports = BankAccount;
