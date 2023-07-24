const express = require('express')
const { getStudentSignUp, postStudentSignUp, postStudentSignIn, getStudentSignIn, getStudentInformation, postUpdate } = require('../controllers/student.controller')
const router = express.Router()

router.get ('/', getStudentSignUp)
router.get('/studentSignIn', getStudentSignIn)

router.post('/student/SignUp', postStudentSignUp)
router.post('/student/SignIn', postStudentSignIn)
router.get('/student_info', getStudentInformation)
router.post('/update_info', postUpdate)


module.exports = router