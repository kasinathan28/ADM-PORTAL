const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  stdName: {
    type: String,
    required: true
  },
  stdEmail: {
    type: String,
    required: true,
    unique: true
  },
  stdSem:{
    type:String,
    required: true,
  },
  stdPassword: {
    type: String,
    required: true
  },
  stdPhoneNumber: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true
  },
  stdDept:{
    type:String,
    required:true
  },
  ActivityPoints:{
    type:String,
  },
  certificates: [
    {
        certificateName: String,
        grade: String,
        certificateUrl: String 
    }
]
});

const Students = mongoose.model("Student", studentSchema);

module.exports = Students;
