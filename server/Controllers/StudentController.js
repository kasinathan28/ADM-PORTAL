const StudentModel = require("../Models/StudentModel");

// Student Login
exports.stdLogin = async (req, res) => {
  console.log("std login api called");
  const { stdEmail, stdPassword } = req.body;
  console.log(req.body);
  try {
    const student = await StudentModel.findOne({ stdEmail });
    if (!student || student.stdPassword !== stdPassword) {
      res.status(401).json({ error: "Invalid Student credentials" });
      return;
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error while Student login:", error);
    res
      .status(500)
      .json({ error: "An error occurred during the Student login" });
  }
};



//   Add new student
exports.addStudent = async (req, res) => {
  try {
    const { stdName, stdEmail, stdPassword, stdPhoneNumber, regNo, stdDept, stdSem } =
      req.body;

    console.log("new Student request body = ", req.body);
    const existingStudent = await StudentModel.findOne({
      $or: [{ stdEmail }, { regNo }],
    });
    if (existingStudent) {
      return res.status(400).json({
        error: "Student with this email or registration number already exists",
      });
    }
    // Create a new student instance
    const newStudent = new StudentModel({
      stdName,
      stdEmail,
      stdPassword,
      stdPhoneNumber,
      regNo,
      stdDept,
      stdSem,
    });

    await newStudent.save();

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.log("Error adding student:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding student", error });
  }
};


// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    console.log(students);
    res.status(200).json(students);
    console.log("Students Details fetched Succesfully");
  } catch (err) {
    res.status(404).json(err);
  }
};


// Delete a student
exports.deletStd = async (req, res) =>{
  const {id} = req.params;
  try {
    const student = await StudentModel.findByIdAndDelete(id);
    res.status(200).json(student);
  } catch (error) {
    console.log("error while deleting the student", error);
  }
}




// get the details of a particular student
exports.getStudent = async (req, res) => {
  console.log("inside student");
  const _id = req.params.id;
  console.log(_id);
  try {
    const student = await StudentModel.findOne({ _id });
    console.log(student);
    res.status(200).json(student);
  } catch (err) {
    res.status(404).json("Student Not Found");
  }
};

// Update student profile
exports.updateStudent = async (req, res) => {
  const id = req.params.id;
  const {
    stdName,
    stdEmail,
    stdPassword,
    stdPhoneNumber,
    regNo,
    stdDept,
    stdSem,
  } = req.body;

  console.log("Student updation called for ", id);

  try {
    const student = await StudentModel.findById(`${id}`);
    console.log(student);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (stdName) {
      student.stdName = stdName;
    }
    if (stdEmail) {
      student.stdEmail = stdEmail;
    }
    if (stdPassword) {
      student.stdPassword = stdPassword;
    }
    if (stdPhoneNumber) {
      student.stdPhoneNumber = stdPhoneNumber;
    }
    if (regNo) {
      student.regNo = regNo;
    }
    if (stdDept) {
      student.stdDept = stdDept;
    }
    if (stdSem) {
      student.stdSem = stdSem;
    }
    const updatedStudent = await student.save();
    console.log("Updated Admin =", updatedStudent);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json(error);
  }
};




// get certification details of a particular
exports.getCertificates = async(req,res)=>{
  console.log(req.params);
 const {id} = req.params
 console.log(id);
 const student = await StudentModel.findById(id)
 try{
   res.status(200).json(student.certificates)
   console.log(student.certificates);
 }
 catch(err){
  res.status(404).json(err)
 }
}


// Add certificate
exports.addCertificates = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    console.log(req.body);
    const { grade, certificateName } = req.body;
    const certificateFile = req.file; 

    const certificate = {
      grade: grade,
      certificateName: certificateName,
      certificateUrl: certificateFile.path, 
    };

    student.certificates.push(certificate);

    await student.save();

    res.status(200).json({ message: "Certificate uploaded successfully" });
  } catch (error) {
    console.error("Error uploading certificate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Calculate activity points
exports.calculateActivityPoints = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await StudentModel.findById(id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    let activityPoints = 0;

    student.certificates.forEach(certificate => {
      switch (certificate.grade.toUpperCase()) {
        case 'A':
          activityPoints += 10;
          break;
        case 'B':
          activityPoints += 9;
          break;
        case 'C':
          activityPoints += 8;
          break;
        case 'D':
          activityPoints += 7;
          break;
        default:
          break;
      }
    });

    student.ActivityPoints = activityPoints;

    await student.save();

    res.status(200).json(student);
  } catch (error) {
    console.error("Error calculating activity points:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



