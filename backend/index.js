import userSchema from "./models/userModel.js";
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
import cors from "cors";
import mongoose from "mongoose";
// import menuRoutes from "./routes/menuRoutes";
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

app.put("/createMenu/:id", async (req, res) => {
  // console.log(req.body);
  // console.log(req.path);
  // console.log(req.params);
  // const user = UserModel.findById(req.user._id);
  const user = await UserModel.findById(req.params.id);
  console.log(user);
  if (user) {
    user.age = req.body.age;
    user.height = req.body.height;
    user.weight = req.body.weight;
    user.gender = req.body.gender;
    user.purpuse = req.body.purpuse;
    user.health = req.body.health;
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  await user.save();
  res.send({ message: "Menu created successfully" });
});

// app.use("/createMenu", menuRoutes);

/*============================
        listen
=============================*/
app.listen(5000, () => {
  console.log("Server is runing at port 5000");
});
