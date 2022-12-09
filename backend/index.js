import userSchema from "./models/userModel.js";
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
import cors from "cors";
import mongoose from "mongoose";
app.use(cors());

/*=================================
        Database
===================================*/
let userData = localStorage.getItem("user");

mongoose
  .connect("mongodb+srv://Vicky:123456EAF@eaf.rhcan5b.mongodb.net/Eat&Fit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
// /************schema*********** */
// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: String,
// });
const UserModel = new mongoose.model("UserModel", userSchema);

/*=================================
        get and post
===================================*/
// app.get("/",(req,res)=>{
//     res.send("App is Runing")
// })
app.post("/register", (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password, repassword } = req.body;
  UserModel.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "This email id already Register" });
    } else {
      const user = new UserModel({
        firstName,
        lastName,
        email,
        password,
      });
      user.save();
      res.send({ message: "Successfull Register" });
    }
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  UserModel.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password == user.password) {
        res.send({ message: "Login SuccessFull", user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "This email id is not register" });
    }
  });
});

app.post("/createMenu", (req, res) => {
  console.log(req.body);
  const { age, height, weight, gender, health, purpuse } = req.body;
  UserModel.updateOne({
    age: age,
    height: height,
    weight: weight,
    gender: gender,
    health: true,
    purpuse: purpuse,
  });
  localStorage.setItem("user", JSON.stringify(res.data.user));
  // user.save();
  res.send({ message: "Menu created successfully" });
});

/*============================
        listen
=============================*/
app.listen(5000, () => {
  console.log("Server is runing at port 5000");
});
