import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import HttpError from "./models/httpError.js";
import menuRoutes from "./routes/menuRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import cors from "cors";
import User from "./models/userModel.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
app.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "This email id already Register" });
    } else {
      const user = new User({
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
  console.log("hey");
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      console.log(user);
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
  const user = await User.findById(req.params.id);
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

// app.use("/signup", menuRoutes);

app.use("/api/menus", menuRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

/*============================
        listen
=============================*/
app.listen(5000, () => {
  console.log("Server is runing at port 5000");
});

// /*=================================
//         Database
// ===================================*/

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
