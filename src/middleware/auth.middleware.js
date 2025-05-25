import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res,next) => {
  try {
    //token fetch

    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "invalid token" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
    }

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    req.user = user;

    next();
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


