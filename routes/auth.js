const express = require("express")
const {registerAdmin,register,login, getMe, registerStaff, loginStaff, forgotPassword, loginUser} = require ("../controllers/authController");

const router = express.Router();

const {  protect, authorize } = require("../middleware/auth");

router.post('/admins/register', protect, authorize("admin"), registerAdmin);

router.post('/login', loginUser);


//Student Routes
router.post("/students/register", register);
// router.post("/students/login", login);
router.get("/students/me", protect, getMe);

// Staff Routes
router.post('/staffs/register', registerStaff);
// router.post('/staffs/login', authorize("staff", "admin"), loginStaff);

router.post("/forgotpassword", forgotPassword);



module.exports = router;