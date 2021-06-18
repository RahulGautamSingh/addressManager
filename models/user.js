const mongoose = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  addresses:{
      type:[mongoose.SchemaTypes.ObjectId],
      default:[],
      ref:'Address',
      required:false
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
