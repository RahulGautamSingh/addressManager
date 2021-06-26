
const deleteAddress = async(addressId)=>{
    let address = await Address.deleteOne({_id:addressId})
    return {status:true,result:address}
    }

    
const createNewAddress = async ({
    city,
    pincode,
    state,
    country,
    addressLine1,
    addressLine2,
    label,
  }) => {
    
  
    try {
      const address = new Address({
        city: city,
        pincode: pincode,
        state: state,
        country: country,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        label: label,
      });
  
      let savedAddress = await address.save();
      console.log(savedAddress)
      return { status: true, result: savedAddress };
    } catch (e) {
      return { status: false, result: e.message };
    }
  };
module.exports = {
  addNewToken,
  deleteToken
};
