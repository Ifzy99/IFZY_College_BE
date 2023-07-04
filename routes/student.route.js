const express = require('express')
const { getStudentSignUp, postStudentSignUp, postStudentSignIn, getStudentSignIn } = require('../controllers/student.controller')
const router = express.Router()

router.get ('/', getStudentSignUp)
router.get('/studentSignIn', getStudentSignIn)

router.post('/student/SignUp', postStudentSignUp)
router.post('/student/SignIn', postStudentSignIn)


module.exports = router