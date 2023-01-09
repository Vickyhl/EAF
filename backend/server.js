import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import HttpError from "./models/httpError.js";
import cors from "cors";
import User from "./models/userModel.js";
import Result from "./models/resultsModel.js";
import nacl from "tweetnacl";
import util from "tweetnacl-util";

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
const SpublicKey = nacl.box.keyPair().publicKey;
const secretKey = nacl.box.keyPair().secretKey;
app.get("/PBrequest", async (req, res) => {
  res.json(SpublicKey);
});

app.post("/vote", async (req, res) => {
  const { id, choice, publicKey } = req.body;
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
  console.log(choice.cipher_text);
  //decrypt users choice
  let decoded_message = nacl.box.open(
    choice.cipher_text,
    choice.one_time_code,
    publicKey,
    secretKey
  );
  let plain_text = encodeInto(decoded_message, uint8Array);
  console.log(plain_text);
  // if (choice === "Democrat") {
  //   results.Democrat += 1;
  // } else if (choice === "Republican") {
  //   results.Republican += 1;
  // }
  // await results.save();
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
