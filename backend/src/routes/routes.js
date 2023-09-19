// routes.js (backend)
const express = require("express");
const router = express();
const mongoose = require("mongoose");
const Address = require("../schema/address");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
router.use(bodyParser.json());

require('dotenv').config()
// Enable CORS for all routes
router.use(cors());
// Connect to MongoDB (replace 'your-database-url' with your actual MongoDB URL)
mongoose
  .connect(
    process.env.DB,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

router.get("/home", (req, res) => {
  res.send("hello");
});
// Define a route to store the address
router.post("/running", async (req, res) => {
  console.log(1234568790);
  console.log(req.body);
  try {
    const { city, country, suburb, postcode, state, state_district } =
      req.body.address;

    // Assuming you are sending city and country in the request body
    const { type, imageName, size } = req.body;
    const address = new Address({
      city,
      country,
      area: suburb,
      postcode,
      state,
      district: state_district,
      image_Information: {
        image_Type: type,
        image_Name: imageName,
        image_Size: size,
      },
    }); // Create a new instance of the Address model

    await address.save(); // Save the address to the database
    res.status(201).json({ message: "Address stored successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while storing the address" });
  }
});

router.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
module.exports = router;
