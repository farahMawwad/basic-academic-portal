const bcrypt = require("bcrypt");
const validator = require("validator");

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   user_id:String,
    role: String,
    userEmail: String,
    passward: String,
    username: String,

});


const CourseSchema = new mongoose.Schema({

  Category:String,
    course_name: String,
    teacher:String,
    start_time: String,
    end_time: String,
      course_description: String,
      student: [UserSchema]

});
//edit
UserSchema.statics.signup = async function (email, pass, passConfirm, name) {
  if ( !email ||   !pass ) {
    return "All fields must be filled";
  }
  if (!validator.isEmail(email)) {
    return "Email not valid";
  }

  if (!validator.isStrongPassword(pass)) {
    return "Password not strong enough" ;
  }

  if (pass !== passConfirm) {
    return "Passwordconfirm is not match";
  }

  const exists = await this.findOne({ userEmail: email });
  if (exists) {
    return "Email already in use";
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  const user = await this.create({ userEmail: email, password: hash, username: name, role: 1 });

  return user;
};
UserSchema.statics.login = async function (email, pass) {
  if (!email && !pass) {
    return "All fields must be filled";
  }
  const user = await this.findOne({userEmail:email});
  if (!user) {
    return "Incorrect email";
  }
  const match = await bcrypt.compare(pass,user.passward);
  if (!match) {
    return "Incorrect password";
  }
  return user;
};

CourseSchema.statics.view = async function () {
 const  result= await this.find({});
 const Math = result.filter(course => course.Category === "Math");
 const Science = result.filter(course => course.Category=== "Science");
 const English = result.filter(course => course.Category=== "English");
 const array =[Math,Science,English]
return array
};
  CourseSchema.statics.mySubject =async function (){
  
    const  result= await this.find({});
    const Subject = result.filter(course => course.teacher === "Farah Awwad")
   return Subject
  }

CourseSchema.statics.add_student = async function (id,information) {
  const Course = await this.findById(id);
  Course.employee.push(information);
  await Course.save();
  return true
};
CourseSchema.statics.deleteCourse = async function (id) {
  console.log(id)
  const Course = await this.deleteOne({ _id: id })
  return true
};
CourseSchema.statics.editCourse = async function (id, newEdit) {
  const { course_name, end_time, start_time, course_description } = newEdit;
  console.log(newEdit);

  const updateData = {
    course_name,
    end_time,
    start_time,
    course_description,
  };

  await this.updateOne({ _id: id }, { $set: updateData });
  return true;
};
const Courses = mongoose.model('Courses', CourseSchema);
const User = mongoose.model('Users', UserSchema);

module.exports = { User,Courses };