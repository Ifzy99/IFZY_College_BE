const mongoose = require ("mongoose")

const staffSchema = ({
       fullname : {type:String, require:true},
       email: {type:String, require:true, unique:true},
       password: {type:String, require:true},
       contact: {type:String, require:true}
})

const staffModel = mongoose.model("staff", staffSchema)

module.exports = staffModel