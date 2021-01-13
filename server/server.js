//import express module
const express = require("express");

//use express in app variable
const app = express();
const cors = require("cors");
require("dotenv").config();
const router2 = require("./src/routes/router2");

app.use(express.json());
app.use(cors());

app.use("/api/v1/", router2);

app.use("/uploads", express.static("uploads"));

//define the server port
const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));