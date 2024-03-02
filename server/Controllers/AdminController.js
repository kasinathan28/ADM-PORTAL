const AdminModel = require("../Models/AdminModel");
const TeacherModel = require("../Models/TeacherModel");
const StudentModel = require("../Models/StudentModel");
const { response } = require("express");

// For admins
// Admin login
exports.adminLogin = async (req, res) => {
  console.log("admin login api called");
  const { adminEmail, adminPassword, adminSecretKey } = req.body;
  console.log(req.body);
  try {
    const admin = await AdminModel.findOne({ adminEmail });
    if (
      !admin ||
      admin.adminPassword !== adminPassword ||
      (admin.adminSecretKey && admin.adminSecretKey !== adminSecretKey)
    ) {
      res.status(401).json({ error: "Invalid admin credentials" });
      return;
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "An error occurred during admin login" });
  }
};

// Add new Admin
exports.addAdmin = async (req, res) => {
  console.log("req body for new admin=", req.body);
  try {
    const {
      adminUsername,
      adminPassword,
      adminEmail,
      adminPhoneNumber,
      adminSecretKey,
    } = req.body;
    console.log(req.body);
    const existingAdmin = await AdminModel.findOne({ adminEmail });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Admin with this email already exists" });
    }
    const newAdmin = new AdminModel({
      adminUsername,
      adminPassword,
      adminEmail,
      adminPhoneNumber,
      adminSecretKey,
    });
    await newAdmin.save();
    console.log(newAdmin);
    res.status(201).json({ message: "Admin added successfully" });
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ error: "An error occurred while adding admin" });
  }
};

// Get all admins
exports.getAdmins = async (req, res) => {
  try {
    const response = await AdminModel.find();
    console.log(response);
    res.status(200).json(response);
    console.log("admin details fetched successfully");
  } catch (err) {
    res.status(404).json(err);
  }
};


// delete an admin
exports.deleteAdmin = async (req, res) =>{
  const {id} = req.params;
  try {
    const newAdmin = await AdminModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("Error deleting the admin",error);
  }
}


// get details of logined admin
exports.getAdmin = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  try {
    const admin = await AdminModel.findOne({ _id });
    console.log(admin);
    res.status(200).json(admin);
  } catch (err) {
    res.status(404).json("Admin Not Found");
  }
};


// Update admin profile
exports.updateAdmin = async (req, res) => {
  const id = req.params.id;
  const { adminPassword, adminPhoneNumber, adminSecretKey, adminEmail } =
    req.body;

  console.log("Admin updation called for ", id);

  try {
    const admin = await AdminModel.findById(`${id}`);
    console.log(admin);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (adminPassword) {
      admin.adminPassword = adminPassword;
    }
    if (adminPhoneNumber) {
      admin.adminPhoneNumber = adminPhoneNumber;
    }
    if (adminSecretKey) {
      admin.adminSecretKey = adminSecretKey;
    }
    if (adminEmail) {
      admin.adminEmail = adminEmail;
    }

    const updatedAdmin = await admin.save();
    console.log("Updated Admin =", updatedAdmin);
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json("Internal Server Error", error);
  }
};


// For teachers

