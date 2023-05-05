const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankOptionSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const BankOption = mongoose.model("BankOption", bankOptionSchema);

module.exports = BankOption;
