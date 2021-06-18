require("dotenv").config();
const jwt = require("jsonwebtoken");

const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userController = require("./controllers/userController");

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("static"));
const authRouter = require("./routes/auth");
const addressRouter = require("./routes/address");

//connecting to DB
mongoose.connect(process.env.MongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", async (req, res) => {
  res.send("Welcome to Mclaren Address Manager");
});

app.use("/user",authRouter)


let validateRequest = async (req, res, next) => {
  if (req.headers === undefined) {
    res.status(403).json({ message: "Invalid request" });
  } else if (req.headers.authorization === undefined) {
    res.status(403).json({ message: "Token not provided" });
  } else {
    let token = req.headers.authorization.slice(7);

    try {
      let data = jwt.verify(token, process.env.secret_token);
      next();
    } catch (err) {
      res.status(403).json({ message: "Invalid token" });
    }
  }
};


app.use("/address",validateRequest,addressRouter)

const PORT = 3300;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
