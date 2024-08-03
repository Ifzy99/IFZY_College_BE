const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors")
const cors = require('cors')
const connectDB = require('./config/db');


//Load env variables
dotenv.config({ path: "./config/config.env"});

//Connect to database
connectDB();


//Route files
const students = require('./routes/students');
const staffs = require('./routes/staffs');

// Initialize the app variable
const app = express();

// Use middleware
app.use(cors());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));



///Dev logging middleware
if(process.env.NODE_ENV === "development"){
  app.use(morgan("dev"));
}

//Mount routes
app.use("api/v1/students", students);
app.use("api/v1/staffs", staffs);



const PORT = process.env.PORT

const server = 
app.listen(PORT, (
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
));

//Handle Unhandled Promise Rejection
process.on("unhandledRejection",(err, promise) => {
  console.log(`Error: ${err.message}`.red);
//Close server & exit process
server.close(() => process.exit(1));    
 });
