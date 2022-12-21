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

// app.post("/api/menus/personalMenu"),
//   async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return next(
//         new HttpError("Invalid inputs passed, please check your data.", 422)
//       );
//     }
//     const { user, age, height, weight, gender, purpuse, health } = req.body;
//     let BMR = 0;
//     let meal1 = [];
//     let meal2 = [];
//     let meal3 = [];
//     let meal4 = [];
//     let meal5 = [];

//     if (gender === "female") {
//       let BMR = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
//     } else {
//       let BMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
//     }
//     if (purpuse === "weightLoss") {
//       BMR = BMR - 300;
//     }

//     if (1200 < BMR < 1375) {
//       // carbsDishes = 8;
//       // proteinDishes = 4;
//       // meatProtein = 1.5;
//       // fatDishes = 5;
//       meal1 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         vegetables[Math.floor(Math.random() * 3)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal2 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal3 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal4 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal5 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         vegetables[Math.floor(Math.random() * 3)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//     } else if (1375 < BMR < 1575) {
//       // carbsDishes = 9;
//       // proteinDishes = 5;
//       // meatProtein = 1.5;
//       // fatDishes = 6;
//       meal1 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         vegetables[Math.floor(Math.random() * 3)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal2 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal3 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal4 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal5 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//     } else if (1575 < BMR < 1825) {
//       // carbsDishes = 10;
//       // proteinDishes = 6;
//       // meatProtein = 2;
//       // fatDishes = 7;
//       meal1 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         vegetables[Math.floor(Math.random() * 3)],
//         vegetables[Math.floor(Math.random() * 3)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal2 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal3 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal4 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal5 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//     } else if (1825 < BMR < 2025) {
//       // carbsDishes = 11;
//       // proteinDishes = 7;
//       // meatProtein = 2;
//       // fatDishes = 8;
//       meal1 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         vegetables[Math.floor(Math.random() * 3)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal2 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal3 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal4 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal5 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//     } else {
//       // carbsDishes = 12;
//       // proteinDishes = 7;
//       // meatProtein = 2.5;
//       // fatDishes = 9;
//       meal1 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         vegetables[Math.floor(Math.random() * 3)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal2 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal3 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         meatProtein[Math.floor(Math.random() * 3)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal4 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//       meal5 = [
//         carbsDishes[Math.floor(Math.random() * 8)],
//         carbsDishes[Math.floor(Math.random() * 8)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         proteinDishes[Math.floor(Math.random() * 4)],
//         vegetables[Math.floor(Math.random() * 3)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//         fatsDishes[Math.floor(Math.random() * 7)],
//       ];
//     }

//   const createdMenu = new Menu({
//     // userID,
//     user: user,
//     category: purpuse,
//     meal1,
//     meal2,
//     meal3,
//     meal4,
//     meal5,
//   });

//   let subjectUser;
//   try {
//     subjectUser = await User.findById(req.body.user);
//   } catch (err) {
//     const error = new HttpError(
//       "Creating menu failed, please try again",
//       500
//     );
//     return next(error);
//   }

//   if (!subjectUser) {
//     const error = new HttpError("Could not find user for provided id", 404);
//     return next(error);
//   }

//   console.log(createdMenu);

//   try {
//     const sess = await mongoose.startSession();
//     sess.startTransaction();
//     await Menu.collection.insertOne(createdMenu, { session: sess });
//     // await createdMenu.save({ session: sess });
//     subjectUser.menus.push(createdMenu);
//     await subjectUser.save({ session: sess });
//     await sess.commitTransaction();
//     await sess.endSession();
//   } catch (err) {
//     console.log(err);
//     const error = new HttpError(
//       "Creating menu failed, please try again",
//       500
//     );
//     return next(error);
//   }

//   res.status(201).json({ menu: createdMenu });
// };

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
