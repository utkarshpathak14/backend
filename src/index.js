import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "https://bpower.netlify.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api",productRoutes)



app.listen(port, () => {
  console.log("app is running");
  connectDB();

});
