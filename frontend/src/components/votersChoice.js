import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import secondPic from "./secondPic.png";
import { useHttpClient } from "../../src/shared/hooks/http-hook.js";
import nacl from "tweetnacl";
nacl.util = require("tweetnacl-util");

export const Vote = () => {
  const { sendRequest } = useHttpClient();
  const [publicKey, setpublicKey] = useState();
  let SpublicKey = nacl.box.keyPair().publicKey;
  let secretKey = nacl.box.keyPair().secretKey;

  const {
    register,
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

        setpublicKey(responseData.PB);
        // setLoadedMenus(responseData);
      } catch (err) {}
    };
    fetcPB();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey", user.choice);

    //encryption of users choice
    const one_time_code = nacl.randomBytes(24);
    const cipher_text = nacl.box(
      nacl.util.decodeUTF8(user.choice),
      one_time_code,
      SpublicKey,
      secretKey
    );
    const transitMessage = { cipher_text, one_time_code };

    const { id, choice, publicKey } = user;
    await axios
      .post("http://localhost:5000/vote", {
        id: user.id,
        publicKey: nacl.box.keyPair().publicKey,
        choice: transitMessage,
      })
      .then((res) => {
        alert(res.data.message);

        window.location.assign("http://localhost:3000/");

        //   localStorage.setItem("user", JSON.stringify(res.data.user));
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
        {/* <label htmlFor="choice">
          Please enter your voting (Democrat or Republican)
        </label>
        <select>
          <option></option>
          <option
            type="Democrat"
            id="Democrat"
            name="Democrat"
            onChange={handleChange}

            // value="Democrat"
          >
            Democrat
          </option>
          <option value="Republican">Republican</option>
          onChange={handleChange}
        </select>
        {errors?.choice?.message && (
          <div className="validationError">{errors?.choice?.message}</div>
        )} */}

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
