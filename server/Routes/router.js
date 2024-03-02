// router.js
const express = require("express");
const router = express.Router();
const AdminContoller = require("../Controllers/AdminController");
const TeacherController = require("../Controllers/TeacherController");
const StudentController = require("../Controllers/StudentController");
const upload = require("../multerConfig/storageConfig");



// Admin Routers
// Admin login
router.post("/admLogin", AdminContoller.adminLogin);
// Add new Admin
router.post("/newadmin", AdminContoller.addAdmin);

// get all admin details
router.get("/getAdmins",AdminContoller.getAdmins);

// get a particular admin details
router.get("/getAdmin/:id",AdminContoller.getAdmin);
// update the specific admin
router.put("/updateAdmin/:id", AdminContoller.updateAdmin);
// Router for deleting an admin 
router.delete("/deleteAdmin/:id", AdminContoller.deleteAdmin);




// Add new Teacher
router.post("/newTeacher",TeacherController.addTeacher);
// Teacher Login
router.post("/thrLogin", TeacherController.thrLogin);
// get a particular teacher details
router.get("/getTeacher/:id",TeacherController.getTeacher);
// update teacher
router.put("/updateTeacher/:id",TeacherController.updateTeacher)
// Delete a teacher
router.delete("/deleteTeacher/:id", TeacherController.deleteTeacher);
// get all teacher details
router.get("/getTeachers",TeacherController.getTeachers);





// Student Routers
// Add new Student
router.post("/newStudent", StudentController.addStudent);
// Student Login
router.post("/stdLogin", StudentController.stdLogin);
// delete student
router.delete("/deleteStudent/:id",StudentController.deletStd)
// get the details of a particular student
router.get("/getStudent/:id",StudentController.getStudent)
// update student details
router.put("/updateStudent/:id",StudentController.updateStudent)
// add certificates
router.post("/addCertificate/:id",upload.single('file'),StudentController.addCertificates)
// get certificate of a partiular student
router.get("/getCertificate/:id",StudentController.getCertificates)
// calculate Activity Points
router.get("/calculate/:id",StudentController.calculateActivityPoints)
// get all students details
router.get("/getStudents",StudentController.getStudents);

module.exports = router;
