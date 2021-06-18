const User = require("../models/user");
const bcrypt = require("bcrypt")

const createNewUser = async ({name, email, password,addresses}) => {
  let emailRegex = /.*@.*\..*/;
  console.log(email)
  if (!emailRegex.test(email)) {
    return { status: false, result: "Invalid email address" };
  }
 
if(!password){
  return{status:false,result:"Password invalid"}
}
 //bycrypt stuff here.
  let hash  = await bcrypt.hash(password,10)
  try {
    const user = new User({ name: name, password: hash, email: email});
    let savedUser = await user.save();
    return {status:true,result:savedUser}
  } catch (e) {
    return {status:false,result:e.message}
  }
};

const findUser = async({email,password})=>{
  let emailRegex = /.*@.*\..*/;
  if (!emailRegex.test(email)) {
    return { status: false, result: "Invalid email address" };
  }

  if(!password){
    return{status:false,result:"Password invalid"}
  }

  
  let user = await User.findOne({email:email})
  if(user===null) return{status:false,result:"No such user exists"}

  let hash = user.password;
  let check = await bcrypt.compare(password,hash)
  if(check){
    return {status:true,result:user}
  }
  else return {status:false,result:"Incorrect password"}


   //bycrypt stuff here.
   

}

const updateUser = async ({email,addressId}) =>{
    let user = await User.findOne({email:email})
    let addArr = user.addresses
    addArr.push(addressId)
    user = await User.updateOne({email:email},{addresses:addArr})
    console.log(user)
}




module.exports = {
  createNewUser,
  findUser,
  updateUser
};
