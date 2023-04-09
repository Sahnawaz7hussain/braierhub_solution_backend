const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDatabase = require("./config/db");
const { userRouter } = require("./routers/userRouter");
const { productRouter } = require("./routers/productRouter");
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});
app.use("/user", userRouter);
app.use("/product", productRouter);

// LISTENING TO SERVER
app.listen(PORT, async () => {
  try {
    console.log("connecting with database");
    await connectDatabase;
    console.log("connected with database");
    console.log(`server running at port:${PORT}`);
  } catch (err) {
    console.log({
      message: "unable to connect with database",
      err: err.message,
    });
  }
});
