const express = require('express')
const { getStaffSignUp, postStaffSignUp, getStaffSignIn, postStaffSignIn } = require('../controllers/staff.controller')
const router = express.Router()


router.get("/staff", getStaffSignUp)

router.post("/SignUp", postStaffSignUp)

router.get("/staffSignUp", getStaffSignIn)
router.post("/admin", postStaffSignIn)

module.exports = router