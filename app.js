const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/user");
const Wallet = require("./models/wallet");
const Contact = require("./models/contact");
const BankAccount = require("./models/bankAccount");
const BankOption = require("./models/bankOption");
const Transaction = require("./models/transaction");

const app = express();
const port = 30001;

require("dotenv").config();
const { DB_USER, DB_PASSWORD } = process.env;
const dbURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@express-server.mh9ka51.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// APIs for Home page
app.get("/wallets", (req, res) => {
  Wallet.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/contacts", (req, res) => {
  Contact.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// APIs for Transactions page
app.get("/transactions", (req, res) => {
  const { status, transactionType } = req.query;

  let filter = {};

  if (status) filter.status = { $in: status.split(",") };
  if (transactionType) filter.type = { $in: transactionType.split(",") };

  Transaction.find(filter)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// APIs for Profile page
app.get("/user_profile", (req, res) => {
  const userId = "6454c2e3fdc895df122ab968";

  User.findById(userId)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/bank_options", (req, res) => {
  BankOption.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/bank_accounts", (req, res) => {
  BankAccount.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.post("/bank_accounts", (req, res) => {
  const bankAccount = new BankAccount({
    ...req.body,
    verification_status: "pending",
  });

  bankAccount
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.delete("/bank_accounts/:id", (req, res) => {
  const { id } = req.params;

  BankAccount.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// workings
app.post("/transactions", (req, res) => {
  const tAll = [
    {
      type: "Bank Transfer Out",
      amount: {
        direction: "-",
        currency: "usd",
        net_amount: "$117.00",
      },
      status: "completed",
    },
  ];

  tAll.forEach((t) => {
    const transaction = new Transaction(t);
    transaction.save();
  });
});

app.post("/contacts", (req, res) => {
  const contactBody = {
    name: "Steve Rogers",
    email: "steve@avengers.org",
  };

  const contact = new Contact(contactBody);
  contact.save().then((result) => {
    console.log(result);
    res.redirect("/");
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
