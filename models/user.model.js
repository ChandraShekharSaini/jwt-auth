import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression to validate email format.
    },

    password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    token:{
      type: String,
      default: undefined,
    }
  },
  { timestamps: true }
);

// userSchema.pre("save", async function () {
//   const user = this;
//   const hash = await bcrypt.hashSync(user.password, 10);
//   user.password = hash;
//   next();
// });

const User = mongoose.model("user", userSchema);
export default User;
