const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

dotEnv.config();

app.use(bodyParser.json()); // we have to use this otherwise we get html response

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("Error", error);
  });

//for middleware regiser we can use app.use() method

app.use("/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server Started and running at ${PORT}`);
});
