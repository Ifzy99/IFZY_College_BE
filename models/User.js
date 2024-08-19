const  mongoose  = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");



const UserSchema = new mongoose.Schema({
      name:{
        type:String,
        required:[true, "Please add a name"]
      },
      email:{
        type:String,
        required:[true, "Please add an email"],
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
      },
      role: {
        type: String,
        enum: ['student', 'staff'],
        default: 'student'
    },
      phone: {
        type: String,
        maxlength: [20, "Phone number can not be longer than 20 characters"],
      },
      photo: {
        type: String,
        default: "no-photo.jpg",
      },
      password:{
        type:String,
        required:[true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select:false
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,

 },
 {
  timestamps: true,
 }
);

//Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next();
    } 

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // next();
  });

          //Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d"
    });
    };

    // Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



 module.exports = mongoose.model("User", UserSchema);