const jwt = require("jsonwebtoken");
const express = require("express");

// let refreshTokens = [];


const { createNewUser, findUser } = require("../controllers/userController");
const router = express.Router();



router.post("/signup", async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  
  let result = await createNewUser(req.body);

  if (result.status) {
    res.send(result.result);
  } else {
    res.status(500).send(result.result);
  }
});
router.route("/login").post(async (req, res) => {
  let result = await findUser(req.body);
  if (result.status) {
    let payload = {
      email: result.result.email,
    };
    console.log(payload);
    let accessToken = jwt.sign(payload, process.env.secret_token, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    // let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    //   expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    // });
    // refreshTokens.push(refreshToken);
    res
      .status(200)
      .json({ access_token: accessToken});
  } else {
    res.status(500).send(result);
  }
});

// router.route("/token").post(async (req, res) => {
//   let { token } = req.body.body;
//   token = token.slice(7);
//   console.log(token, refreshTokens);
//   if (!token || !refreshTokens.includes(token)) {
//     res.send(401);
//   } else {
//     let accessToken = jwt.sign({}, process.env.secret_token, {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
//     });
//     res.status(200).json({ access_token: accessToken });
//   }
// });
module.exports = router;
