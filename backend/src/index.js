import express from "express";
import cors from "cors";
import userRoute from "./routes/auth.route.js";
import "dotenv/config";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

//connect DB
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
