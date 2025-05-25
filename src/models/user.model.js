import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    gstin: {
      type: String,
      required: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Buyer/Seller role
    role: {
      type: String,
      enum: ["user", "admin","superAdmin"],
      default: "buyer",
    },

    // Seller-specific fields (optional for buyers)
    turnover: {
      type: Number,
      default: null,
    },
    categories: {
      type: [String],
      default: [],
    },
    bankDetails: {
      type: String,
      default: null,
    },
    document: {
      type: String, // store filename or URL
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
