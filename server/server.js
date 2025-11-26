const express = require("express");
const product = require("./router/product");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require('./router/user.js'); // הנתיב היחסי לתיקייה שלך

const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());

app.use("/product", product); 
app.use('/user', userRouter);


app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
