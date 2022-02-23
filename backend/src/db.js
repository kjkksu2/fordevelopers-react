import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", () => console.log("❌ Connection Errors"));
db.once("open", () => console.log("✅ Connection Success"));
