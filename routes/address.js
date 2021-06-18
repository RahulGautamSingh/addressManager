const jwt = require("jsonwebtoken");
const express = require("express");

const { createNewAddress ,deleteAddress,updateAddress} = require("../controllers/addressController");
const { updateUser, seeAllAddresses,findAddresses } = require("../controllers/userController");
const router = express.Router();

router.post("/add", async (req, res) => {
  let token = req.headers.authorization.slice(7);

  var decoded = jwt.decode(token, { complete: true });
  console.log(decoded.payload);

  let userEmail = decoded.payload.email;

  let address = await createNewAddress(req.body);
  if (address.status) {
    console.log(address.result._id);
    let user = await updateUser({
      email: userEmail,
      addressId: address.result._id,
    });
    if (user.status) {
      res.json({ user: user.result });
    } else res.status(401).json({ message: user.result });
  } else {
    res.status(401).json({ message: address.result });
  }
});

router.delete("/:addressID", async (req, res) => {
    let id = req.params.addressID;
    let result = await deleteAddress(id);
    res.json(result.result)
});

router.get("/",async(req,res)=>{
 
    let token = req.headers.authorization.slice(7);

    var decoded = jwt.decode(token, { complete: true });
    console.log(decoded.payload);
  
    let userEmail = decoded.payload.email;
    if(req.url==="/"){
    let addArr = await seeAllAddresses(userEmail)
    console.log(addArr)
  res.json(addArr)}
  else{
      let url = req.url.split("?")
      url = url[1].split("&")
      let obj={}
     url.forEach(elem=>{
        elem = elem.split("=")
        obj[elem[0]] = elem[1]
     })
     let addArr = await findAddresses(userEmail,obj)
    console.log(addArr)
  res.json(addArr)
  }
})

router.patch("/:addressID",async(req,res)=>{
    let id = req.params.addressID;
    let result = await updateAddress(id,req.body);
    res.json(result.result)
})

module.exports = router;
