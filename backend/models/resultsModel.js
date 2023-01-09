import mongoose from "mongoose";

const resultSchema = mongoose.Schema(
  {
    Republican: {
      type: Number,
      default: 0,
    },
    Democrat: {
      type: Number,
      default: 0,
    },
    // finalResult: {
    //   type: String,
    //   default: 0,
    // },
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

const Result = mongoose.model("Result", resultSchema);

export default Result;
