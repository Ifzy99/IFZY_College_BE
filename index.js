const express = require('express')
const dotenv = require("dotenv")
const app = express()
const schPort = process.env.PORT
const cors = require('cors')
const  mongoose  = require('mongoose')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const SCH_URI = process.env.URI

//Load env variables
dotenv.config({ path: "./config/config.env"})

//Route files
const students = require('./routes/students')
const staffs = require('./routes/staffs')

//Mount routes
app.use("api/v1/students", students);
app.use("api/v1/staffs", staffs);

mongoose.connect(SCH_URI)
  .then(()=>{
    console.log("Mongoose has been Mongoosed");
  })
  .catch((err)=>{
    console.log(err)
  })



  
app.listen(schPort, ()=>{
    console.log(`school server has started at ${schPort}`);
})