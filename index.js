const express = require('express')
const app = express()
require('dotenv').config()
const schPort = process.env.PORT
const cors = require('cors')
const  mongoose  = require('mongoose')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const SCH_URI = process.env.URI

const studentRoute = require('./routes/student.route')
app.use('/', studentRoute)

const staffRoute = require('./routes/staff.route')
app.use('/staff', staffRoute)

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