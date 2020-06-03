"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT;

const Router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(Router);

app.listen(port, () => {
  console.log(`Server ready listening on port ${port}`);
});
