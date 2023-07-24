const studentModel = require("../models/student.model");
let jwt = require("jsonwebtoken");



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
    studentModel.find(
        {email:req.body.email,password:req.body.password},
        {upsert:true, new:true}
        )

    .then((response)=>{
        console.log(response)
        if(response.length >0){
            let studentToken = jwt.sign(
                {email: req.body.email},
                process.env.JWTSECRET,
                
                
            )
            res.send({studentToken, message: "correct"})
        }else{
           
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

const postStudentDB = (req,res)=>{
    studentModel.find({})
}

 

const getStudentInformation = (req, res) => {
    
    let studentToken = req.headers.authorization
    // console.log(studentToken);
    jwt.verify(studentToken, process.env.JWTSECRET, (err, result) => {
        if (err) {
            console.log("error");
        } else {
            studentModel.findOne({email: result.email})
            .then((response) => {
                // console.log(response);
                res.send(response)
            })
        }
    })
    // if(studentToken== true){
    //     // studentModel.findOne()
    //     // .then((response) => {
    //     //     // console.log(response);
    //     //     res.send({status: true, response})
    //     // })

    // }
}


const postUpdate =(req,res)=>{
    let myEmail = req.body.userEmail
    let newPassword = req.body.newPass
    let oldPassword = req.body.password
    // console.log(myEmail, newPass, password);
    studentModel.findOneAndUpdate(
        {email: myEmail}
    )
    .then((response)=>{
        console.log(response);
        if (response) {
            if(response.password==oldPassword){  
                response.password = newPassword
                response.save()
                .then((results) => {
                    if (results) {
                        console.log("password changed");
                    } else {
                        console.log("password failed to change");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    })
}






module.exports = {getStudentSignUp,postStudentSignUp,getStudentSignIn,postStudentSignIn, getStudentInformation, postUpdate}