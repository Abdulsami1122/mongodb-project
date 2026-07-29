const Student = require("../models/Student");

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    const isValidAdmin =
        username === "admin" && password === "admin123";

    if (!isValidAdmin) {
        return res.status(401).json({
            message: "Invalid admin credentials"
        });
    }

    return res.json({
        message: "Login successful",
        role: "admin"
    });
};

exports.createStudent = async (req, res) => {
    const student = await Student.create(req.body);
    res.json(student);
};

exports.getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

exports.getStudent = async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student);
};

exports.updateStudent = async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(student);
};

exports.deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
        message: "Student Deleted"
    });
};
