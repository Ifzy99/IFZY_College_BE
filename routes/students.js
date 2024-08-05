const express = require('express')
const {getStudents, registerStudents,loginStudent} = require("../controllers/studentController");
// const { getStudentSignUp, postStudentSignUp, postStudentSignIn, getStudentSignIn, getStudentInformation, postUpdate } = require('../controllers/student.controller')
const router = express.Router()



router.post("/register", registerStudents);
router.post("/login", loginStudent);



// router.get ('/', getStudentSignUp)
// router.get('/studentSignIn', getStudentSignIn)

// router.post('/student/SignUp', postStudentSignUp)
// router.post('/Student/SignIn', postStudentSignIn)
// router.get('/student_info', getStudentInformation)
// router.post('/update_info', postUpdate)


module.exports = router