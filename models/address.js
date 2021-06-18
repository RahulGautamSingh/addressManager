const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  city: {
    type: String,
    unique: false,
    required: true,
  },
  pincode: {
    type: String,
    unique: false,
    required: true,
  },
  state: {
    type: String,
    unique: false,
    required: true,
  },
  country:{
    type: String,
    unique: false,
    required: true,
  },
  addressLine1:{
    type: String,
    unique: false,
    required: true,
  },
  addressLine2:{
    type: String,
    unique: false,
    required: true,
  },
  label:{
    type: String,
    unique: false,
    required: true,
  }
});

const AddressModel = mongoose.model("Address", AddressSchema);

module.exports = AddressModel;
