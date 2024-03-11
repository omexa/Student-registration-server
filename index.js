const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { studModel, courseModel } = require("./model/studentModel");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/learn");
const db = mongoose.connection;
db.on("eror", (error) => {
  console.error("not connect", error);
});
db.once("open", () => {
  console.log("connected to database successfully");
});

app.get("/getStuds", (req, res) => {
  studModel
    .find()
    .then((studs) => res.json(studs))
    .catch((err) => res.json(err));
});

app.get("/registeredStudent", (req, res) => {
  studModel
    .find()
    .then((stud) => res.json(stud))
    .catch((err) => res.json(err));
});

app.get("/getCourse", (req, res) => {
  courseModel
    .find()
    .then((course) => res.json(course))
    .catch((err) => console.log(err));
});

app.post("/addCourse", (req, res) => {
  const { dept } = req.body;
  courseModel.findOne({ dept }).then((course) => {
    if (course) {
      console.log("already registered");
    } else {
      courseModel
        .create({ dept })
        .then((course) => res.json("succesfully added"))
        .catch((err) => res.json("error"));
    }
  });
});

app.post("/register", (req, res) => {
  const { name } = req.body;
  studModel.findOne({ name }).then((stud) => {
    if (stud) {
      console.log("Already-registered");
      res.send("Already-registered");
    } else {
      studModel
        .create(req.body)
        .then((studs) => {
          console.log(studs);
          res.send("Registered-successfully");
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error occurred");
        });
    }
  });
});

app.patch("/course", (req, res) => {
  try {
    //
  } catch (err) {
    //
  }
});

app.post("/deleteCourse", async (req, res) => {
  const { id } = req.body;
  try {
    await courseModel.deleteOne({ _id: id });
    return res.status(200).json({ data: "deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: "failed to delete" });
  }
});

app.post("/deleteStudent", async (req, res) => {
  const { id } = req.body;
  try {
    await studModel.deleteOne({ _id: id });
    return res.status(200).json("deleted succesfully");
  } catch (error) {
    return res.status(400).json("not deleted");
  }
});

app.listen(5000, () => {
  console.log("server running on 5000");
});
