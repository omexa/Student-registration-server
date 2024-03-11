const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: String,
  sex: String,
  age: Number,
  phone: String,
});
const courseSchema = new mongoose.Schema({
  dept: String,
});
const studModel = mongoose.model("students", studentSchema);
const courseModel = mongoose.model("departments", courseSchema);
module.exports = {
  studModel,
  courseModel,
};
