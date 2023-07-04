const studentModel = require("../models/student.model");


const getStudentSignUp = (req,res)=>{
    res.render("StudentSignUp")
}

const getStudentSignIn = (req,res)=>{
    res.render("StudentSignUp")
}

const postStudentSignUp =  (req,res)=>{
    console.log(req.body);
    let form = new studentModel(req.body)
    form.save()
    .then((response)=>{
        console.log(response);
        res.send("save")
       
    })
    .catch((err)=>{
        console.log(err);
    })
}

const postStudentSignIn =  (req,res)=>{
    studentModel.find({email:req.body.email,password:req.body.password})
    .then((response)=>{
        console.log(response)
        if(response.length >0){
            res.send("Dashboard")
        }else{
           
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}




module.exports = {getStudentSignUp,postStudentSignUp,getStudentSignIn,postStudentSignIn}