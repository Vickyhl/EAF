import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    county: {
      type: String,
      required: true,
    },
    voted: {
      type: Boolean,
      required: true,
      default: false,
    },
    choice: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

userSchema.plugin(uniqueValidator);

const User = new mongoose.model("User", userSchema);

export default User;
