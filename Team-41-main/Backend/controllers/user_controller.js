const tree_model = require("../models/tree_model");
const user_model = require("../models/user_model");
const lake_model = require("../models/lake_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const registerController = async (req, res) => {
  try {
    const exisitingUser = await user_model.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = await req.body.password;
    const salt = await bcrypt.genSalt(10);//salt is used for making password more protected
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new user_model(req.body);
    await newUser.save();
    res.redirect("GetALL");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `User Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await user_model.findOne({ email: req.body.email });
    console.log(req.body.email)
    if (!user) {
      return res.status(200).send({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invalid Email or Password", success: false });
    }

    // Set user data in the session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      // Add any other user data you want to store in the session
    };

    res.redirect("GetALL");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in user Login CTRL: ${error.message}` });
  }
};


const AddTreeController = async(req , res) =>{
    try {
      const newTree = await tree_model({ ...req.body});

      if(req.file){
        newTree.picture = req.file.path
      }
      await newTree.save();
      res.redirect("GetALL");
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While adding a tree",
      });
    }
  }; 

const getAllTreesController = async (req, res) => {
  try {
    const tree = await tree_model.find({});
     const Lake = await lake_model.find({});
    res.render("home", { data: tree ,data1:Lake});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching tree",
      error,
    });
  }
};

  const getAllTreesByPinCode = async (req, res) => {
    const { pin } = req.body;
  
    try {
      // Find all entries with the specified employee ID
      const trees = await tree_model.find({ pincode : pin });
  
      res.status(200).json({
        success: true,
        data: trees,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch trees',
      });
    }
  };

  const getAllTreesBySpecies = async (req, res) => {
    const { spc } = req.body;
  
    try {
      // Find all entries with the specified employee ID
      const trees = await tree_model.find({ species : spc });
  
      res.status(200).json({
        success: true,
        data: trees,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch trees',
      });
    }
  };

  const AddLakeController = async (req, res) => {
    try {
      const newLake = await lake_model({ ...req.body });

      if (req.file) {
        newLake.picture = req.file.path;
      }
      await newLake.save();
      res.redirect("GetALL");
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While adding a Lake",
      });
    }
  };


   const Event_model = require("../models/event_model");

  // Function to add a new event
  const addEvent = async (req, res) => {
    try {
      const { name, description, startDate, endDate } = req.body;

      // Create a new event document
      const newEvent = new Event_model({
        name,
        description,
        startDate,
        endDate
      });

      // Save the new event to the database
      const savedEvent = await newEvent.save();

      res.status(201).json({
        success: true,
        message: "Event added successfully",
        data: savedEvent,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error while adding an event",
        error: error.message,
      });
    }
  };

  // Function to get all events
  const getAllEvents = async (req, res) => {
    try {
      // Find all events in the database
      const events = await Event_model.find({});

      res.status(200).json({
        success: true,
        message: "All events fetched successfully",
        data: events,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error while fetching events",
        error: error.message,
      });
    }
  };

 const signoutController = (req, res) => {
   // Destroy the user's session
   req.session.destroy((err) => {
     if (err) {
       console.log("Error while destroying session:", err);
       return res
         .status(500)
         .send({ message: "Unable to sign out", success: false });
     }

     // Redirect the user back to the authentication page (e.g., login or signup)
     res.redirect("/"); // Replace '/auth' with the route for your authentication page
   });
 };

  const getAllTreesByPinCode = async (req, res) => {
    const { pin } = req.body;
  
    try {
      // Find all entries with the specified employee ID
      const trees = await tree_model.find({ pincode : pin });
  
      res.status(200).json({
        success: true,
        data: trees,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch trees',
      });
    }
  };

  const getAllTreesBySpecies = async (req, res) => {
    const { spc } = req.body;
  
    try {
      // Find all entries with the specified employee ID
      const trees = await tree_model.find({ species : spc });
  
      res.status(200).json({
        success: true,
        data: trees,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch trees',
      });
    }
  };



  module.exports = {
    AddTreeController,
    getAllTreesController,
    AddLakeController,
    addEvent,
    getAllEvents,
    loginController,
    registerController,
    getAllTreesByPinCode,
    getAllTreesBySpecies,
    signoutController
  };
