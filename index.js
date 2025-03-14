import express, { json } from "express";
import { connect } from "mongoose";
import userPublicRoutes from "./routes/userPublicRouter.js";
import userPrivateRoutes from "./routes/userPrivateRouter.js";
import postRoutes from "./routes/postRouter.js";
import followRoutes from "./routes/followRouter.js";
import hashtagRoutes from "./routes/hashtagRouter.js";
import postHashtagRoutes from "./routes/postHashtagRouter.js";
import categoryRoutes from "./routes/categoryRouter.js";
import commentRoutes from "./routes/commentRouter.js";
import likeRoutes from "./routes/likesRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import notificationRoutes from "./routes/notificationRouter.js";
import cors from 'cors';
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { verifyToken } from "./services/tokenVerification.js";
import { verificationOfAuthority } from "./services/verificationOfAuthority.js";
import fileUpload from 'express-fileupload';
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";



const app = express();
app.use(express.urlencoded({ extended: true })); // Handles form-data
app.use(express.json()); // Handles JSON payloads
const allowedOrigins = ["http://localhost:5174", "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(fileUpload(
  {
    useTempFiles: true,  // Store uploaded files in temp files
    tempFileDir: '/tmp/', // You can choose a different directory
  }
))
app.use(cookieParser());



// Use Routes
app.use("/api", userPublicRoutes);
app.use("/api", userPrivateRoutes);
app.use("/api", postRoutes);
app.use("/api",verifyToken, followRoutes);
app.use("/api",verifyToken, hashtagRoutes);
app.use("/api",verifyToken, postHashtagRoutes);
app.use("/api",verifyToken, categoryRoutes);
app.use("/api",verifyToken, commentRoutes);
app.use("/api",verifyToken, likeRoutes);
app.use("/api",verifyToken, messageRoutes);
app.use("/api",verifyToken, notificationRoutes);

// Start Server
const PORT = process.env.PORT || 5001;





app.listen(PORT, async () => {
  await connect("mongodb+srv://test:test@finalproject.xf5kk.mongodb.net/").then(
    () => console.log("CONNECTED TO DB")
  );
  console.log(`Example app listening on PORT ${PORT}`);
});
