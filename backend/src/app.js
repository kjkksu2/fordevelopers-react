import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import userRouter from "./routes/userRouter";
import playRouter from "./routes/playRouter";
import apiRouter from "./routes/apiRouter";

const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 하루
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRouter);
app.use("/play", playRouter);
app.use("/api", apiRouter);

export default app;
