import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import userRouter from "./routes/userRouter";
import menuRouter from "./routes/menuRouter";

const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRouter);
app.use("/menus", menuRouter);

export default app;
