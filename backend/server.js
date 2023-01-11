import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import HttpError from "./models/httpError.js";
import cors from "cors";
import User from "./models/userModel.js";
import Result from "./models/resultsModel.js";
import nacl from "tweetnacl";
import util from "tweetnacl-util";

// nacl.util = require("tweetnacl-util");

let SsecretKey = new Uint8Array([
  143, 28, 216, 227, 2, 177, 160, 159, 243, 180, 138, 230, 142, 165, 28, 189,
  208, 63, 130, 131, 204, 240, 105, 142,
]);
let choice = new Uint8Array([
  143, 28, 216, 227, 2, 177, 160, 159, 243, 180, 138, 230, 142, 165, 28, 189,
  208, 63, 130, 131, 204, 240, 105, 142, 152, 26, 27, 28, 29, 30, 32, 31,
]);
let key = new Uint8Array([
  143, 28, 216, 227, 2, 177, 160, 159, 243, 180, 138, 230, 142, 165, 28, 189,
  208, 63, 130, 131, 204, 240, 105, 142, 152, 26, 27, 28, 29, 30, 32, 31,
]);

// /*=================================
//         Database
// ===================================*/

mongoose
  .connect("mongodb+srv://Vicky:963214785ok@cluster0.cou6q.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

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
// const SsecretKey = nacl.box.keyPair().secretKey;
// const SpublicKey = nacl.box.keyPair().publicKey;

let secretKey = nacl.randomBytes(nacl.secretbox.nonceLength);
let SpublicKey = nacl.randomBytes(nacl.secretbox.nonceLength);

app.get("/PBrequest", async (req, res) => {
  // console.log(SpublicKey);
  res.json(SpublicKey);
});

app.post("/vote", async (req, res) => {
  let { id, choiee, publicKey, decrypte } = req.body;
  let user = await User.findById(id);

  //finding the object that holds the results
  let results = await Result.findById("63b6bab8514d5edacab52327");
  if (user) {
    if (user.voted === true) res.send({ message: "This id is already voted!" });
    else {
      user.voted = true;
    }
  } else {
    res.send({ message: "This id is not authorized to vote!" });
  }

  let decrypted = nacl.secretbox.open(choice, SsecretKey, key);

  if (decrypte === "Democrat") {
    results.Democrat += 1;
  } else if (decrypte === "Republican") {
    results.Republican += 1;
  }
  await results.save();

  decrypted = decrypte;
});

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
