const express = require('express')
const { getStaffSignUp, postStaffSignUp, getStaffSignIn, postStaffSignIn } = require('../controllers/Staff')
const router = express.Router()


router.get("/staff", getStaffSignUp)

router.post("/SignUp", postStaffSignUp)

router.get("/staffSignUp", getStaffSignIn)
router.post("/admin", postStaffSignIn)

module.exports = router