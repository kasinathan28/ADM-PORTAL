const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    thrUsername :{
        type:String,
        required: true,
    },
    thrEmail:{
        type:String,
        required: true,
    },
    thrPassword:{
        type:String,
        required: true
    },
    thrPhoneNumber:{
        type:String,    
        required:true
    },
    thrDept:{
        type:String,
        required: true,
    },
    thrAadhar:{
        type:String,
        required:true,
    },

});

const Teachers = mongoose.model("Teachers", teacherSchema);
module.exports = Teachers;