// import { validationResult } from "express-validator";
// import JWTpkg from "jsonwebtoken";
// const { sign } = JWTpkg;
// import pkg from "bcryptjs";
// const { hash, compare } = pkg;
// import HttpError from "../models/httpError.js";
// // import User, { find, findOne } from "../models/userModel.js";

// export const getUsers = async (req, res, next) => {
//   let users;
//   try {
//     users = await find({}, "-password");
//   } catch (err) {
//     const error = new HttpError(
//       "Fetching users failed, please try again later.",
//       500
//     );
//     return next(error);
//   }
//   res.json({ users: users.map((user) => user.toObject({ getters: true })) });
// };

// export const signup = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError("Invalid inputs passed, please check your data.", 422)
//     );
//   }

//   const { firstName, lastName, email, password } = req.body;

//   let existingUser;
//   try {
//     existingUser = await findOne({ email: email });
//   } catch (err) {
//     const error = new HttpError(
//       "Signing up failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   if (existingUser) {
//     const error = new HttpError(
//       "User exists already, please login instead.",
//       422
//     );
//     return next(error);
//   }

//   let hashedPassword;
//   try {
//     hashedPassword = await hash(password, 12);
//   } catch (err) {
//     const error = new HttpError(
//       "Could not create user, please try again.",
//       500
//     );
//     return next(error);
//   }

//   const createdUser = new User({
//     firstName,
//     lastName,
//     email,
//     image: req.file.path,
//     password: hashedPassword,
//     places: [],
//   });

//   try {
//     await createdUser.save();
//   } catch (err) {
//     const error = new HttpError(
//       "Signing up failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   let token;
//   try {
//     token = sign(
//       { userId: createdUser.id, email: createdUser.email },
//       "supersecret_dont_share",
//       { expiresIn: "1h" }
//     );
//   } catch (err) {
//     const error = new HttpError(
//       "Signing up failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   res
//     .status(201)
//     .json({ userId: createdUser.id, email: createdUser.email, token: token });
// };

// export const login = async (req, res, next) => {
//   const { email, password } = req.body;

//   let existingUser;

//   try {
//     existingUser = await findOne({ email: email });
//   } catch (err) {
//     const error = new HttpError(
//       "Logging in failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   if (!existingUser) {
//     const error = new HttpError(
//       "Invalid credentials, could not log you in.",
//       401
//     );
//     return next(error);
//   }

//   let isValidPassword = false;
//   try {
//     isValidPassword = await compare(password, existingUser.password);
//   } catch (err) {
//     const error = new HttpError(
//       "Could not log you in, please check your credentials and try again.",
//       500
//     );
//     return next(error);
//   }

//   if (!isValidPassword) {
//     const error = new HttpError(
//       "Invalid credentials, could not log you in.",
//       401
//     );
//     return next(error);
//   }

//   let token;
//   try {
//     token = sign(
//       { userId: existingUser.id, email: existingUser.email },
//       "supersecret_dont_share",
//       { expiresIn: "1h" }
//     );
//   } catch (err) {
//     const error = new HttpError(
//       "Logging in failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   res.json({
//     userId: existingUser.id,
//     email: existingUser.email,
//     token: token,
//   });
// };

// import HttpError from "../models/httpError.js";

// const DUMMY_USERS = [
//   {
//     id: "u1",
//     name: "Max Schwarz",
//     email: "test@test.com",
//     password: "testers",
//   },
// ];

// const getUsers = (req, res, next) => {
//   res.json({ users: DUMMY_USERS });
// };

// const signup = (req, res, next) => {
//   const { name, email, password } = req.body;

//   const hasUser = DUMMY_USERS.find((u) => u.email === email);
//   if (hasUser) {
//     throw new HttpError("Could not create user, email already exists.", 422);
//   }

//   const createdUser = {
//     id: "u1",
//     name, // name: name
//     email,
//     password,
//   };

//   DUMMY_USERS.push(createdUser);

//   res.status(201).json({ user: createdUser });
// };

// const login = (req, res, next) => {
//   const { email, password } = req.body;

//   const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
//   if (!identifiedUser || identifiedUser.password !== password) {
//     throw new HttpError(
//       "Could not identify user, credentials seem to be wrong.",
//       401
//     );
//   }

//   res.json({ message: "Logged in!" });
// };

// const _getUsers = getUsers;
// export { _getUsers as getUsers };
// const _signup = signup;
// export { _signup as signup };
// const _login = login;
// export { _login as login };

import { validationResult } from "express-validator";

import HttpError from "../models/httpError.js";
import User from "../models/userModel.js";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { firstName, lastName, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password,
    menus: [],
  });

  try {
    console.log(createdUser);
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  console.log(existingUser);
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  res.json({ message: "Logged in!" });
};

const _getUsers = getUsers;
export { _getUsers as getUsers };
const _signup = signup;
export { _signup as signup };
const _login = login;
export { _login as login };
