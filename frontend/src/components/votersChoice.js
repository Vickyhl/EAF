import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import secondPic from "./secondPic.png";
import { useHttpClient } from "../../src/shared/hooks/http-hook.js";
import nacl from "tweetnacl";
import util from "tweetnacl-util";

export const Vote = () => {
  const { sendRequest } = useHttpClient();
  const [Key, setKey] = useState();
  let publicKey = nacl.box.keyPair().publicKey;
  const SpublicKey = nacl.box.keyPair().publicKey;
  let secretKey = nacl.box.keyPair().secretKey;
  // const SsecretKey = nacl.box.keyPair().secretKey;

  const {
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState({
    id: "",
    choice: "",
    publicKey: "",
  });
  //get public key from server
  useEffect(() => {
    const fetcPB = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/PBrequest"
        );
        // console.log("servers public key is:", responseData.SpublicKey);
        setKey(responseData.PB);
      } catch (err) {}
    };
    fetcPB();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let decrypte = user.choice;

    //encryption of users choice
    let secretKey = nacl.randomBytes(nacl.secretbox.nonceLength);
    let secret_msg = util.decodeUTF8(user.choice);
    let encrypted = nacl.secretbox(secret_msg, secretKey, SpublicKey);
    console.log(encrypted);

    await axios
      .post("http://localhost:5000/vote", {
        id: user.id,
        choice: encrypted, //encrypted choice
        publicKey: publicKey,
        decrypte,
      })
      .then((res) => {
        alert(res.data.message);

        window.location.assign("http://localhost:3000/");
      });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
      [e.target.choice]: e.target.value,
    });
  };

  return (
    <div className="container" src={secondPic}>
      <img className="img-fluid" alt="homeImg" src={secondPic} />

      <form>
        <label htmlFor="id">Enter your Id:</label>
        <input type="id" id="id" name="id" onChange={handleChange} />

        <label htmlFor="choice">Enter your choice:</label>
        <input
          type="choice"
          id="choice"
          name="choice"
          onChange={handleChange}
        />

        <label htmlFor="ballot">Please enter your prefered ballot:</label>
        <select>
          <option></option>
          <option value="Orleans">Orleans</option>
          <option value="Livingston">Livingston</option>
          <option value="Gloucester">Gloucester</option>
          <option value="Anchorage">Anchorage</option>
          <option value="Butler">Butler</option>
          onChange={handleChange}
        </select>
        {errors?.ballot?.message && (
          <div className="validationError">{errors?.ballot?.message}</div>
        )}

        <div className="btn-container">
          <button className="btn" onClick={handleSubmit}>
            Vote!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Vote;
