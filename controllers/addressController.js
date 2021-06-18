const Address = require("../models/address");

const createNewAddress = async ({
  city,
  pincode,
  state,
  country,
  adressLine1,
  addressLine2,
  label,
}) => {
  if (
    !city ||
    !pincode ||
    !state ||
    !country ||
    !adressLine1 ||
    !addressLine2 ||
    !label
  ) {
    return { status: false, result: "Data incomplete" };
  }

  try {
    const user = new Address({
      city: city,
      pincode: pincode,
      state: state,
      country: country,
      adressLine1: addressLine1,
      addressLine2: addressLine2,
      label: label,
    });
    let savedAddress = await address.save();
    return { status: true, result: savedAddress };
  } catch (e) {
    return { status: false, result: e.message };
  }
};

module.exports = {
  createNewAddress,
};
