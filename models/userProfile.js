import BankAccount from "./bankAccount";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userProfileSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
    },
    profile_img_url: {
      type: String,
      required: true,
    },
    bank_accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount",
      },
    ],
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
