const staffModel = require("../models/staff.model");


const getStaffSignUp = (req, res)=>{
           res.render("StaffSignUp")
}

const postStaffSignUp =(req,res)=>{
    console.log(req.body);
    let form = new staffModel(req.body)
    form.save()
    .then((response)=>{
        console.log(response);
        res.send("Data Saved")
    })
    .catch((err)=>{
        console.log(err);
    })
}

const getStaffSignIn =(req,res)=>{
    res.render("StaffSignUp")
}

const postStaffSignIn =(req,res)=>{
    staffModel.find({email:req.body.email, password:req.body.password})
    .then((response)=>{
          console.log(response);
          if(response.lenght > 0){
            res.send("Seen")
          }else{

          }
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports ={getStaffSignUp,postStaffSignUp,getStaffSignIn,postStaffSignIn}