const mongoose = require("mongoose");
require("dotenv").config();

const base_url = process.env.MONGO_URL;

//console.log("MONGO_URL: ", base_url);

const connectDatabase = mongoose.connect(base_url);

module.exports = connectDatabase;
