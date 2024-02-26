const bcrypt = require("bcrypt"); // for teacher pass
const path = require("path");
const upload = require("./../MiddleWares/multerConfig");
// import schema from model
const Teachers = require("./../models/teacherSchema");

exports.getAllTeachers = async (req, res, next) => {
  try {
    const data = await Teachers.find({});
    if (!data) {
      throw new Error("No teachers found");
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};

exports.addTeacher = async (req, res, next) => {
  try {
    const { fullname, password, email } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    const { file } = req;
    const image = req.file.filename;

    console.log(image);
    console.log(fullname);
    console.log("pass", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new Teachers({
      fullname: fullname,
      password: hashedPassword,
      email: email,
      image: (file && file.path) || null,
    });
    const insertedTeacher = await newTeacher.save();
    res.status(201).json({ data: insertedTeacher });
  } catch (error) {
    next(error);
  }
};

exports.updateTeacher = async (req, res, next) => {
  try {
    const { fullname, password, email, image } = req.body;
    let updateFailds = {};
    // check first what user sended
    if (fullname) updateFailds.fullname = fullname;
    if (password) updateFailds.password = password;
    if (email) updateFailds.email = email;
    if (image) updateFailds.image = image;

    const updatedTeacher = await Teachers.findByIdAndUpdate(
      req.body.id,
      updateFailds
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json({ data: updatedTeacher });
  } catch (error) {
    next(error);
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    const deletedTeacher = await Teachers.findByIdAndDelete(req.body.id);
    if (!deletedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res
      .status(200)
      .json({ message: "Delete Successfuly", data: deletedTeacher });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { id, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the teacher's password
    await Teachers.findByIdAndUpdate(id, { password: hashedPassword });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.findTeacherById = async (req, res, next) => {
  try {
    const data = await Teachers.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Sorry can't find it!" });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};
