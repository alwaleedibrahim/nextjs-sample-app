import mongoose, { Schema } from "mongoose";
import { boolean } from "zod";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  }
});

const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default UserModel;
