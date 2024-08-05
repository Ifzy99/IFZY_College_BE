const asyncHandler = require("../middleware/async");
const Student = require ("../models/Student");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
        



//@desc      Register a new Student
//@route     POST/api/students
//@access    Public
exports.registerStudents = asyncHandler(async (req, res, next) => {
   
    const { name, email, password, phone } = req.body;

    //Validation
    if (!name || !email || !password || !phone){
        return next(new ErrorResponse("Please fill in all fields", 400)) 
    }

    //Check for existing user
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
        return next(new ErrorResponse("Student already exists", 400))
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create student
    const student = await Student.create({ 
        name, 
        email, 
        phone, 
        password:hashedPassword 
    });

       if(student){
        res.status(201).json({success:true, 
            _id:student._id,
            name:student.name,
            email:student.email,
            token: generateToken(student._id)
        });
       }else{
        return next(new ErrorResponse("Invalid student data", 400)) 
       }

});


//@desc      Login a  Student
//@route     POST/api/students/login
//@access    Public         
exports.loginStudent = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //Validate email & password
    if (!email || !password){
        return next(new ErrorResponse("Please provide an email and password", 400))
        }
      
     // Check for user 
    const student = await Student.findOne({ email }).select("+password") ;

    if(!student){
        return next(new ErrorResponse("Invalid credentials", 401))
    }

    //Check if password matches
    const isMatch = await bcrypt.compare(password, student.password);
    if(!isMatch){
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Send response 
        res.status(200).json({success:true,
            _id:student._id,
            name:student.name,
            email:student.email,
            token: generateToken(student._id)
            });

})

//Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
        });
}



















// const studentModel = require("../models/student.model");
// let jwt = require("jsonwebtoken");



// const getStudentSignUp = (req,res)=>{
//     res.render("StudentSignUp")
// }

// const getStudentSignIn = (req,res)=>{
//     res.render("StudentSignUp")
// }

// const postStudentSignUp =  (req,res)=>{
//     console.log(req.body);
//     let form = new studentModel(req.body)
//     form.save()
//     .then((response)=>{
//         console.log(response);
//         res.send("save")
       
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// }

// const postStudentSignIn =  (req,res)=>{
//     studentModel.find(
//         {email:req.body.email,password:req.body.password},
//         // {upsert:true, new:true}
//         )
//     .then((response)=>{
//         console.log(response)
//         if(response.length >0){
//             let studentToken = jwt.sign(
//                 {email: req.body.email},
//                 process.env.JWTSECRET,
//                 {expiresIn:"6h"},   
//             )
//             res.send({studentToken, message: "User Signed in Successfully"})
//         }else{
//             res.send({message:"Wrong Pass"})
//         }
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }

// const postStudentDB = (req,res)=>{
//     studentModel.find({})
// }

 

// const getStudentInformation = (req, res) => {
//     let studentToken = req.headers.authorization
//     // console.log(studentToken);
//     jwt.verify(studentToken,process.env.JWTSECRET,(err,result)=> {
//         if (err){
//             console.log(err)
//             res.send({message:"Error Occured", status:false})
//         }else{
//             let userEmail = result.email
//             studentModel.findOne({email: userEmail})
//             .then ((response)=>{
//                 res.send({response, status:true})
//             })
//         } 
//     })
//     // let studentToken = req.headers.authorization.split(" ")[1]
//     // jwt.verify(studentToken, process.env.JWTSECRET, (err, result) => {
//     //     if (err) {
//     //         console.log("error");
//     //         res.send({message:"Error Occured", status:false})
//     //     } else {
//     //         studentModel.findOne({email: result.email})
//     //         .then((response) => {
//     //             res.send({response, status:true})
//     //         })
//     //     }
//     // })
// }


// // const postUpdate =(req,res)=>{
// //     const {oldPassword,newPassword}=req.body
// //     let myEmail = req.body.userEmail
// //     try{
// //         const user = await studentModel.findOne(myEmail);

// //         const passwordMatch = await bcrypt.compare(oldPassword,);
// //         if(!passwordMatch){
// //             return res.status(401).json({error: "Invalid current Password"});
// //         }
// //         const hashedPassword = await bcrypt.hash(newPassword,10);

// //         await. studentModel.findOneAndUpdate(myEmail, {password: hashedPassword});
// //         res.json({message: "Password changed successfully"});
// //     }
// //     catch (error){
// //         console.log(error);
// //         res.status(500).json({error: "Internal Server Error"})
// //     }
// //     });

//     const postUpdate = async (req, res) => {
//         const { oldPassword, newPassword } = req.body;
//         const userEmail = req.user.email; 
//         // Assuming you have implemented authentication
      
//         try {
//           // Fetch the user from the database
//           const user = await studentModel.findOne(userEmail);
      
//           // Validate current password
//           const passwordMatch = await bcrypt.compare(oldPassword, user.password);
//           if (!passwordMatch) {
//             return res.status(401).json({ error: 'Invalid current password' });
//           }
      
//           // Hash the new password
//           const hashedPassword = await bcrypt.hash(newPassword, 10);
      
//           // Update the user's password in the database
//           await studentModel.findOneAndUpdate(userEmail, { password: hashedPassword });
      
//           res.json({ message: 'Password changed successfully' });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         }
//       };
      







// module.exports = {getStudentSignUp,postStudentSignUp,getStudentSignIn,postStudentSignIn, getStudentInformation, postUpdate}