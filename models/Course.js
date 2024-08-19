const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a course title']
      },
      description: {
        type: String,
        required: [true, 'Please add a course description']
      },
      duration: {
        type: String, 
        required: [true, 'Please add the course duration'],
        enum: ["3 Months", "6 Months", "1 Year"]
      },
      tuition: {
        type: Number,
        required: [true, 'Please add a tuition cost']
      },
      scholarshipAvailable: {
        type: Boolean,
        default: false
      },
      programme:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Programme',
        required: true
      }
    //   instructor: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Staff', // Reference to Staff model
    //     required: true,
    //  },
    //   enrolledStudents: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Student',
    //     required: true
    //   },
      
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Course", CourseSchema);