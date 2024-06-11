const jwt = require("jsonwebtoken");
const { User, Courses } = require("../models/Models");

const createToken = (_id,role) => {
  return jwt.sign({_id ,role}, process.env.SECRET, { expiresIn: "3d" });
};
exports.signup = async (req, res) => {
  console.log(req.body);
  const { email, pass, passConfirm, name} = req.body;
  try {
    const result = await User.signup( email, pass, passConfirm, name);
    if (typeof result === "object") {
      res.status(200).json({ email});
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.login = async (req, res) => {
    const {email,pass} = req.body;
    try {
      const user = await User.login(email, pass);
  
      if (typeof user === "object") {
        const token = createToken(user._id,user.role);
        res.status(200).json({token});
      } else {
        res.send(user);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }}
    exports.CourseView = async (req, res) => {
      try {
        res.status(200).json( await Courses.view());
      } catch (error) {
        console.error("An error occurred:", error); 
        res.status(500).json({ error: error.message }); 
      }
    };
    exports.mySubject = async (req, res) => {
      try {
        res.status(200).json( await Courses.mySubject());
      } catch (error) {
        console.error("An error occurred:", error); 
        res.status(500).json({ error: error.message }); 
      }
    };
    exports.add_student = async (req, res) => {
      try {
        const id =req.body._id
        const information =req.body.information
        res.status(200).json( await Courses.add_student(id,information));
      } catch (error) {
        console.error("An error occurred:", error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Respond with an error status and message
      }
    };
    exports.deleteCourse = async (req, res) => {
      try {
        const id =req.params.id
   
        res.status(200).json( await Courses.deleteCourse(id));
      } catch (error) {
        console.error("An error occurred:", error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Respond with an error status and message
      }
    };
    exports.editCourse = async (req, res) => {
      try {
        const id = req.params.id;
        const newEdit = req.body;
        console.log('Received data for update:', newEdit);
        const result = await Courses.editCourse(id, newEdit);
        res.status(200).json(result);
      } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: error.message });
      }
    };
    

    