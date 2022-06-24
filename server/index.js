const jwt = require(`jsonwebtoken`);
const cors = require("cors");
const PgPromise = require("pg-promise");
const express = require("express");
const fs = require("fs");
require("dotenv").config();
const { default: axios } = require("axios");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const API = require("./api");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const config = {
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://sinovuyo:gar123@localhost:5432/hearts_app",
  // ssl: { rejectUnauthorized: false },
};

const db = pgp(DATABASE_URL);

API(app, db);

const PORT = process.env.PORT || 4017;

app.listen(PORT, function () {
  console.log(`App started on port ${PORT}`);
});
