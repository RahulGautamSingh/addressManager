const jwt = require("jsonwebtoken");
const express = require("express");


const { createNewAddress } = require("../controllers/addressController");
const { updateUser } = require("../controllers/userController");
const router = express.Router();



router.post("/add", async (req, res) => {
    let token = req.headers.authorization.slice(7);
    console.log(token)
    var decoded = jwt.decode(token, {complete: true});
    let userEmail = decoded.payload.userEmail
console.log(userEmail)
   
    let address = await createNewAddress(req.body);
    let user = await updateUser({email:userEmail,address:address._id})
    


//   if (result.status) {
//     res.send(result.result);
//   } else {
//     res.status(500).send(result.result);
//   }
});

module.exports = router;
