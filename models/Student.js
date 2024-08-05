const  mongoose  = require("mongoose");

const StudentSchema = new mongoose.Schema({
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



 module.exports = mongoose.model("Student", StudentSchema);