import React, { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import data from "../ContextApi";

const CreateMenu = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { userData, setUserData } = useContext(data);
  const handleSubmitForm = async (formData) => {
    const { age, height, weight, gender } = formData;
    await axios
      .post("http://localhost:5000/createMenu", formData)
      .then((res) => {
        alert(res.data.message);
      });
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((preve) => {
  //     return {
  //       ...preve,
  //       [name]: value,
  //     };
  //   });
  // };
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.age]: e.target.value,
      [e.target.height]: e.target.value,
      [e.target.weight]: e.target.value,
      [e.target.gender]: e.target.value,
      [e.target.health]: e.target.true,
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label htmlFor="age">Enter your age:</label>
        <input
          type="number"
          id="age"
          {...register("age", {
            required: "This field is required",
            min: { value: 18, message: "The required age is older than 18" },
            max: { value: 65, message: "The required age is younger than 65" },
          })}
          onChange={handleChange}
        />
        {errors?.age?.message && (
          <div className="validationError">{errors?.age?.message}</div>
        )}
        <label htmlFor="height">Enter your height:</label>
        <input
          type="number"
          id="height"
          {...register("height", {
            required: "This field is required",
          })}
          onChange={handleChange}
        />
        {errors?.height?.message && (
          <div className="validationError">{errors?.height?.message}</div>
        )}
        <label htmlFor="weight">Enter your weight:</label>
        <input
          type="number"
          id="weight"
          {...register("weight", {
            required: "This field is required",
          })}
          onChange={handleChange}
        />
        {errors?.weight?.message && (
          <div className="validationError">{errors?.weight?.message}</div>
        )}
        <label htmlFor="gender">Enter your gender:</label>
        <select {...register("gender", { required: "This field is required" })}>
          <option></option>
          <option value="female">female</option>
          <option value="male">male</option>
          onChange={handleChange}
        </select>
        {errors?.gender?.message && (
          <div className="validationError">{errors?.gender?.message}</div>
        )}
        <label htmlFor="purpuse">Enter your menu purpuse:</label>
        <select
          {...register("purpuse", { required: "This field is required" })}
        >
          <option></option>
          <option value="maintenence">Maintening the existing weight</option>
          <option value="weightLoss">Weight loss</option>
          onChange={handleChange}
        </select>
        {errors?.purpuse?.message && (
          <div className="validationError">{errors?.purpuse?.message}</div>
        )}
        <div className="form-check">
          <input
            type="checkbox"
            name="selectCheckbox"
            id="selectCheckbox"
            {...register("chooseCb", { required: "This field is required" })}
            className={`form-check-label ${
              errors?.chooseCb ? "is-invalid" : ""
            }`}
            onChange={handleChange}
          />
          <label htmlFor="chooseCb" className="form-check-label">
            Health declaration
          </label>
          <div className="validationError">{errors?.chooseCb?.message}</div>
        </div>

        <div className="btn-container" onClick={handleSubmit}>
          <button type="submit" className="btn">
            Create the menu
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMenu;
