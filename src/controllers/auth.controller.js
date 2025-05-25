import { generateToken } from "../lib/utlis.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  //handel error and send status code
  const { fullName, email, password,role } = req.body;

  try {
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be atleast of 6 digit" });
      
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already Exists" });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //save newuser User model
    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
      role,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role:newUser.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user Data" });
    }
  } catch (error) {
    console.log("error in signup", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const {email,password,} = req.body;

  const user = await User.findOne({email});
  if(!user) res.status(400).json({message:"invalid credentials "});



  //password correct hai ki nahi check karo bcrypt se
  const isPasswordCorrect = await bcrypt.compare(password,user.password) 
  if(!isPasswordCorrect) res.status(400).json({message:"invalid credentials "});


  




  //token generate 
  generateToken(user._id,res);
  
  //send status
  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,

  });

    
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ message: "internal server error" });
    
  }



};

export const checkAuth = async(req,res)=>{
  try {
    
   return res.status(201).json(req.user);

  } catch (error) {
    
    console.log("error in login controller", error.message);
   return res.status(500).json({ message: "internal server error" });
  }
}