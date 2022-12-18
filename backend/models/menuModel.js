import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  Nutrients: { type: String, required: true },
  Category: { type: String, required: true },
});

const menuSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      // required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    isPaid: {
      type: Boolean,
      // required: true,
      default: false,
    },
    meal1: {
      type: Array,
      required: true,
    },
    meal2: {
      type: Array,
      required: true,
    },
    meal3: {
      type: Array,
      required: true,
    },
    meal4: {
      type: Array,
      required: true,
    },
    meal5: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
