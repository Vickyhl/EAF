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

const UserModel = new mongoose.model("UserModel", userSchema);

/*=================================
        get and post
===================================*/
app.get("/", (req, res) => {
  res.send("App is Runing");
});
app.post("/register", (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
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

// app.put("/createMenu", (req, res) => {
//   console.log(req.body);
//   // const user = UserModel.findById(req.user._id);
//   const user = UserModel.findById("6385fe43464b4dcadf98c329");
//   if (user) {
//     user.age = req.body.age;
//     user.height = req.body.height;
//     user.weight = req.body.weight;
//     user.gender = req.body.gender;
//     user.purpuse = req.body.purpuse;
//     user.health = req.body.health;
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
//   // user.save;
//   UserModel.updateOne(user);
//   // console.log(user);
//   // user._mongooseOptions.save;
//   res.send({ message: "Menu created successfully" });
// });
app.put("http://localhost:5000/createMenu/:id", (req, res) => {
  // console.log(req.body);
  const user = UserModel.findByIdAndUpdate("6385fe43464b4dcadf98c329", {
    $set: req.body,
  });
  console.log(user);
  // console.log(user);
  // console.log(req.params._id);
  // if (user) {
  //   user.age = req.body.age;
  //   user.height = req.body.height;
  //   user.weight = req.body.weight;
  //   user.gender = req.body.gender;
  //   user.purpuse = req.body.purpuse;
  //   user.health = req.body.health;
  // } else {
  //   res.status(404);
  //   throw new Error("User not found");
  // }
  // // user.save;
  // UserModel.updateOne(user);
  // // console.log(user);
  // // user._mongooseOptions.save;
  res.send({ message: "Menu created successfully" });
});

/*============================
        listen
=============================*/
app.listen(5000, () => {
  console.log("Server is runing at port 5000");
});
