import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a user name"],
    unique: [true, "user name should be unique"],
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: [true, "email should be unique"],
  },
  password: {
    type: String,
    required: [true, "please provide password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken : String,
  forgotPasswordTokenExpiry: Date,
  verifyToken : String,
  verifyTokenExpiry: Date,


});

const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User