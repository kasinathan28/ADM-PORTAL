const TeacherModel = require("../Models/TeacherModel");

// Teacher Login
exports.thrLogin = async (req, res) => {
    console.log("thr login api called");
    const { thrEmail, thrPassword } = req.body;
    console.log(req.body);
    try {
        const teacher = await TeacherModel.findOne({ thrEmail });
        if (!teacher || teacher.thrPassword !== thrPassword) {
            res.status(401).json({ error: "Invalid teacher credentials" });
            return;
        }
        res.status(200).json(teacher);
    } catch (error) {
        console.error("Error while teacher login:", error);
        res.status(500).json({ error: "An error occurred during the teacher login" });
    }
};

// get details of logined Teacher
exports.getTeacher = async (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    try {
      const teacher = await TeacherModel.findOne({ _id });
      console.log(teacher);
      res.status(200).json(teacher);
    } catch (err) {
      res.status(404).json("Teacher Not Found");
    }
  };
  

// Update admin profile
exports.updateTeacher = async (req, res) => {
    console.log("inside");
    const id = req.params.id;
    const { thrUsername, thrPhoneNumber, thrPassword, thrEmail,thrDept,thrAadhar } =
      req.body;
  
    console.log("Teacher updation called for ", id);
  
    try {
      const teacher = await TeacherModel.findById(`${id}`);
      console.log(teacher);
  
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      if (thrPassword) {
        teacher.thrPassword = thrPassword;
      }
      if (thrPhoneNumber) {
        teacher.thrPhoneNumber = thrPhoneNumber;
      }
      if (thrUsername) {
        teacher.thrUsername = thrUsername;
      }
      if (thrEmail) {
        teacher.thrEmail = thrEmail;
      }
      if (thrDept) {
        teacher.thrDept = thrDept;
      }
      if (thrAadhar) {
        teacher.thrAadhar = thrAadhar;
      }
  
      const updatedTeacher = await teacher.save();
      console.log("Updated Teacher =", updatedTeacher);
      res.status(200).json(updatedTeacher);
    } catch (error) {
      res.status(500).json("Internal Server Error", error);
    }
  };


  // delete a teacher
exports.deleteTeacher = async (req, res) =>{
  const {id} = req.params;
  console.log(id);
  try {
    const teacher = await TeacherModel.findByIdAndDelete(id);
    res.status(200).json(teacher);
  } catch (error) {
    console.log("Error deleting the teacher", error);
  }
}

//   Add New Teacher
exports.addTeacher = async (req, res) => {
  try {
    const {
      thrUsername,
      thrEmail,
      thrPassword,
      thrPhoneNumber,
      thrDept,
      
      thrAadhar,
    } = req.body;

    console.log("Request body = ", req.body);
    const existingTeacher = await TeacherModel.findOne({ thrEmail });
    if (existingTeacher) {
      return res
        .status(400)
        .json({ error: "Teacher with this email already exists" });
    }

    const newTeacher = new TeacherModel({
      thrUsername,
      thrEmail,
      thrPassword,
      thrPhoneNumber,
      thrDept,
      thrAadhar,
    });

    await newTeacher.save();

    res.status(201).json({ message: "Teacher added successfully" });
  } catch (error) {
    console.error("Error adding teacher:", error);
    res.status(500).json({ error: "An error occurred while adding teacher" });
  }
};

// Get all teachers
exports.getTeachers = async (req, res) => {
  try {
    const response = await TeacherModel.find();
    console.log(response);
    res.status(200).json(response);
    console.log("Teachers details are fetched successfully");
  } catch (err) {
    res.status(404).json(err);
  }
};
