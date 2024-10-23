const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session"); // Import the express-session middleware

const app = express();
const user_route = require("./routes/user_route");

app.set("view engine", "ejs");

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB through mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Session middleware
app.use(
  session({
    secret: "your-secret-key", // Change this to your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if you are using HTTPS
      maxAge: 3600000, // Session timeout in milliseconds (e.g., 1 hour)
    },
  })
);

// Use routes
app.use("/", user_route);


// For Heroku
const port = process.env.PORT || 5000; // Use the environment variable for the port if available

app.listen(port, () => console.log(`Server running on port ${port}`));
