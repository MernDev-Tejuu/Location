// models/Address.js (backend)
const mongoose = require('mongoose');

// Define the schema for the Address model
const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true, // City is required
  },
  
  
    area:{
      type:String,
    },

    district:String,
    state:String,
    postcode:String,
    country: {
      type: String,
      required: true, // Country is required
    },

   image_Information :{
    image_Name: String,
    image_Type:String,
    image_Size:String
   }

    

  
  // You can add more fields as needed
});

// Create the Address model
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
