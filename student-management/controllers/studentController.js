const Student = require("../models/Student");
const User = require("../models/User");

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        return res.json({
            message: "Login successful",
            role: user.role
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error during login"
        });
    }
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
